using Microsoft.Extensions.DependencyInjection;
using UppyBlazor.Client.Components.Uppy.Dashboard;

namespace UppyBlazor.Client.Components;

/// <summary>
/// Extension methods to register required component services into IServiceCollection.
/// </summary>
public static class Startup
{
    /// <summary>
    /// Registers required component services into IServiceCollection.
    /// </summary>
    /// <param name="services">IServiceCollection instance.</param>
    /// <returns>IServiceCollection.</returns>
    public static IServiceCollection AddComponentServices(this IServiceCollection services)
    {
        if (services == null)
        {
            throw new ArgumentNullException(nameof(services));
        }

        services.AddTransient<IDashboardInteropService, DashboardInteropService>();

        return services;
    }
}
