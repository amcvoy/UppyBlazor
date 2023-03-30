using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace UppyBlazor.Client.Components.Uppy.Dashboard;
internal class DashboardInteropService : IDashboardInteropService
{
    private class DashboardMethods
    {
        public static string InitDashboard = MethodName("initDashboardInstance");
        public static string SetAutoProceed = MethodName("setAutoProceed");
        public static string SetDarkMode = MethodName("setDarkMode");
        public static string SetDisabled = MethodName("setDisabled");
        public static string SetNote = MethodName("setNote");

        // Events
        public static string OnModalOpen = MethodName("onModalOpen");
        public static string OnModalClosed = MethodName("onModalClosed");

        private static string MethodName(string methodName) => $"{methodName}";
    }

    private readonly IJSRuntime _jsRuntime;

    private IJSObjectReference? _dashboardModule;

    private readonly string _tusEndpoint;

    private static string Version { get { return "?v=" + DateTime.Now.Ticks.ToString(); } }

    public DashboardInteropService(IJSRuntime jsRuntime, NavigationManager navigationManager)
    {
        _jsRuntime = jsRuntime;
        _tusEndpoint = navigationManager.BaseUri + "files/";
    }

    /// <inheritdoc />
    public async Task InitDashboardAsync(string containerId, bool darkMode)
    {
        // Import the Dashboard module.
        await using var jsModule = await _jsRuntime.InvokeAsync<IJSObjectReference>("import",
            "./_content/UppyBlazor.Client.Components/Uppy/Dashboard/UppyDashboard.razor.js" + Version);

        // Create and instance of the Dashboard module.
        _dashboardModule = await jsModule.InvokeAsync<IJSObjectReference>(DashboardMethods.InitDashboard, containerId, _tusEndpoint, darkMode);
    }

    /// <inheritdoc />
    public async Task SetAutoProceed(bool autoProceed)
    {
        if (_dashboardModule != null)
        {
            // Update Dashboard options.
            await _dashboardModule.InvokeVoidAsync(DashboardMethods.SetAutoProceed, autoProceed);
        }
    }

    /// <inheritdoc />
    public async Task SetDarkMode(bool enabled)
    {
        if (_dashboardModule != null)
        {
            // Update Dashboard options.
            await _dashboardModule.InvokeVoidAsync(DashboardMethods.SetDarkMode, enabled);
        }
    }

    /// <inheritdoc />
    public async Task SetDisabled(bool disabled)
    {
        if (_dashboardModule != null)
        {
            // Update Dashboard options.
            await _dashboardModule.InvokeVoidAsync(DashboardMethods.SetDisabled, disabled);
        }
    }

    /// <inheritdoc />
    public async Task SetNote(string note)
    {
        if (_dashboardModule != null)
        {
            // Update Dashboard options.
            await _dashboardModule.InvokeVoidAsync(DashboardMethods.SetNote, note);
        }
    }

    /// <inheritdoc />
    public async Task OnModalOpen<T>(string selectorId, DotNetObjectReference<T> componentRef, string methodName) where T : class
    {
        if (_dashboardModule != null)
        {
            await _dashboardModule.InvokeVoidAsync(
                DashboardMethods.OnModalOpen,
                selectorId,
                componentRef,
                methodName
            );
        }
    }

    /// <inheritdoc />
    public async Task OnModalClosed<T>(string selectorId, DotNetObjectReference<T> componentRef, string methodName) where T : class
    {
        if (_dashboardModule != null)
        {
            await _dashboardModule.InvokeVoidAsync(
                DashboardMethods.OnModalClosed,
                selectorId,
                componentRef,
                methodName
            );
        }
    }

    #region IAsyncDisposable
    public async ValueTask DisposeAsync()
    {
        if (_dashboardModule is not null) { await _dashboardModule.DisposeAsync(); }
    }

    #endregion
}
