using Microsoft.JSInterop;

namespace UppyBlazor.Client.Components.Uppy.Dashboard;
internal interface IDashboardInteropService : IAsyncDisposable
{
    /// <summary>
    /// Create a new instance of the Uppy Dashboard module.
    /// </summary>
    /// <param name="selectorId"></param>
    /// <param name="darkMode"></param>
    /// <returns></returns>
    Task InitDashboardAsync(string selectorId, bool darkMode);

    /// <summary>
    /// Upload as soon as files are added.
    /// </summary>
    /// <param name="autoProceed"></param>
    /// <returns></returns>
    Task SetAutoProceed(bool autoProceed);

    /// <summary>
    /// Set the Dashboard dark mode option.
    /// </summary>
    /// <param name="enabled"></param>
    /// <returns></returns>
    Task SetDarkMode(bool enabled);

    /// <summary>
    /// Disable/Enable the Dashboard UI.
    /// </summary>
    /// <param name="disabled"></param>
    /// <returns></returns>
    Task SetDisabled(bool disabled);

    /// <summary>
    /// Set the Dashboard note option.
    /// </summary>
    /// <param name="note">Note to display in the dashboard</param>
    /// <returns></returns>
    Task SetNote(string note);

    /// <summary>
    /// Dashboard modal open
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="selectorId"></param>
    /// <param name="componentRef"></param>
    /// <param name="methodName"></param>
    Task OnModalOpen<T>(string selectorId, DotNetObjectReference<T> componentRef, string methodName) where T : class;

    /// <summary>
    /// Dashboard modal closed
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="selectorId"></param>
    /// <param name="componentRef"></param>
    /// <param name="methodName"></param>
    Task OnModalClosed<T>(string selectorId, DotNetObjectReference<T> componentRef, string methodName) where T : class;
}
