using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using UppyBlazor.Server.Services.Tus;

namespace UppyBlazor.Server.Services;

/// <summary>
/// Extension methods to register custom services.
/// </summary>
public static class Startup
{
    /// <summary>
    /// Registers custom services into IServiceCollection.
    /// </summary>
    /// <param name="services">IServiceCollection instance.</param>
    /// <returns>IServiceCollection.</returns>
    public static IServiceCollection AddCustomServices(this IServiceCollection services)
    {
        if (services == null)
        {
            throw new ArgumentNullException(nameof(services));
        }

        services.AddTus();

        return services;
    }

    /// <summary>
    /// Maps custom endpoints into IEndpointRouteBuilder.
    /// </summary>
    /// <param name="builder">IEndpointRouteBuilder instance.</param>
    /// <returns></returns>
    public static IEndpointRouteBuilder MapCustomEndpoints(this IEndpointRouteBuilder builder)
    {
        builder.MapTusEndpoints();
        return builder;
    }
}
