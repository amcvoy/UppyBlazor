using System.Net;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using tusdotnet;
using tusdotnet.Models;
using tusdotnet.Models.Concatenation;
using tusdotnet.Models.Configuration;
using tusdotnet.Models.Expiration;
using tusdotnet.Stores;
using UppyBlazor.Server.Services.Tus.Endpoints;
using UppyBlazor.Server.Services.Tus.Services;

namespace UppyBlazor.Server.Services.Tus;

internal static class Startup
{
    internal static IServiceCollection AddTus(this IServiceCollection services)
    {
        services.AddSingleton<TusDiskStorageOptionHelper>();
        services.AddSingleton(services => CreateTusConfigurationForCleanupService(services));
        services.AddHostedService<ExpiredFilesCleanupService>();

        return services;
    }

    internal static IEndpointRouteBuilder MapTusEndpoints(this IEndpointRouteBuilder endpoints)
    {
        // Handle downloads (must be set before MapTus)
        endpoints.MapGet("/files/{fileId}", DownloadFileEndpoint.HandleRoute);

        // Setup tusdotnet for the /files/ path.
        endpoints.MapTus("/files/", TusConfigurationFactory);

        return endpoints;
    }

    static DefaultTusConfiguration CreateTusConfigurationForCleanupService(IServiceProvider services)
    {
        var path = services.GetRequiredService<TusDiskStorageOptionHelper>().StorageDiskPath;

        // Simplified configuration just for the ExpiredFilesCleanupService to show load order of configs.
        return new DefaultTusConfiguration
        {
            Store = new TusDiskStore(path),
            Expiration = new AbsoluteExpiration(TimeSpan.FromMinutes(5))
        };
    }

    static Task<DefaultTusConfiguration> TusConfigurationFactory(HttpContext httpContext)
    {
        var logger = httpContext.RequestServices.GetRequiredService<ILoggerFactory>().CreateLogger("TusServer");

        // Change the value of EnableOnAuthorize in appsettings.json to enable or disable
        // the new authorization event.
        var enableAuthorize = httpContext.RequestServices.GetRequiredService<IOptions<OnAuthorizeOption>>().Value.EnableOnAuthorize;

        var diskStorePath = httpContext.RequestServices.GetRequiredService<TusDiskStorageOptionHelper>().StorageDiskPath;

        var config = new DefaultTusConfiguration
        {
            Store = new TusDiskStore(diskStorePath),
            MetadataParsingStrategy = MetadataParsingStrategy.AllowEmptyValues,
            UsePipelinesIfAvailable = true,
            Events = new Events
            {
                OnAuthorizeAsync = ctx =>
                {
                    // Note: This event is called even if RequireAuthorization is called on the endpoint.
                    // In that case this event is not required but can be used as fine-grained authorization control.
                    // This event can also be used as a "on request started" event to prefetch data or similar.

                    if (!enableAuthorize)
                        return Task.CompletedTask;

                    if (ctx.HttpContext.User.Identity?.IsAuthenticated != true)
                    {
                        ctx.HttpContext.Response.Headers.Add("WWW-Authenticate", new StringValues("Basic realm=tusdotnet-test-net6.0"));
                        ctx.FailRequest(HttpStatusCode.Unauthorized);
                        return Task.CompletedTask;
                    }

                    if (ctx.HttpContext.User.Identity.Name != "test")
                    {
                        ctx.FailRequest(HttpStatusCode.Forbidden, "'test' is the only allowed user");
                        return Task.CompletedTask;
                    }

                    // Do other verification on the user; claims, roles, etc.

                    // Verify different things depending on the intent of the request.
                    // E.g.:
                    //   Does the file about to be written belong to this user?
                    //   Is the current user allowed to create new files or have they reached their quota?
                    //   etc etc
                    switch (ctx.Intent)
                    {
                        case IntentType.CreateFile:
                            break;
                        case IntentType.ConcatenateFiles:
                            break;
                        case IntentType.WriteFile:
                            break;
                        case IntentType.DeleteFile:
                            break;
                        case IntentType.GetFileInfo:
                            break;
                        case IntentType.GetOptions:
                            break;
                        default:
                            break;
                    }

                    return Task.CompletedTask;
                },

                OnBeforeCreateAsync = ctx =>
                {
                    // Partial files are not complete so we do not need to validate
                    // the metadata in our example.
                    if (ctx.FileConcatenation is FileConcatPartial)
                    {
                        return Task.CompletedTask;
                    }

                    if (!ctx.Metadata.ContainsKey("name") || ctx.Metadata["name"].HasEmptyValue)
                    {
                        ctx.FailRequest("name metadata must be specified. ");
                    }

                    if (!ctx.Metadata.ContainsKey("contentType") || ctx.Metadata["contentType"].HasEmptyValue)
                    {
                        //ctx.FailRequest("contentType metadata must be specified. ");
                    }

                    return Task.CompletedTask;
                },
                OnCreateCompleteAsync = ctx =>
                {
                    logger.LogInformation($"Created file {ctx.FileId} using {ctx.Store.GetType().FullName}");
                    return Task.CompletedTask;
                },
                OnBeforeDeleteAsync = ctx =>
                {
                    // Can the file be deleted? If not call ctx.FailRequest(<message>);
                    return Task.CompletedTask;
                },
                OnDeleteCompleteAsync = ctx =>
                {
                    logger.LogInformation($"Deleted file {ctx.FileId} using {ctx.Store.GetType().FullName}");
                    return Task.CompletedTask;
                },
                OnFileCompleteAsync = ctx =>
                {
                    logger.LogInformation($"Upload of {ctx.FileId} completed using {ctx.Store.GetType().FullName}");
                    // If the store implements ITusReadableStore one could access the completed file here.
                    // The default TusDiskStore implements this interface:
                    //var file = await ctx.GetFileAsync();
                    return Task.CompletedTask;
                }
            },
            // Set an expiration time where incomplete files can no longer be updated.
            // This value can either be absolute or sliding.
            // Absolute expiration will be saved per file on create
            // Sliding expiration will be saved per file on create and updated on each patch/update.
            Expiration = new AbsoluteExpiration(TimeSpan.FromMinutes(5))
        };

        return Task.FromResult(config);
    }
}