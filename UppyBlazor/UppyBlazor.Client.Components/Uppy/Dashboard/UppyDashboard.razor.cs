using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace UppyBlazor.Client.Components.Uppy.Dashboard
{
    public partial class UppyDashboard : IAsyncDisposable
    {
        private readonly string _dashboardContainerId = $"dashboard_{Guid.NewGuid():n}";

        /// <summary>
        /// Dashboard container Id. It can be used when multiple Dashboards are added to one page.
        /// </summary>
        public string DashboardId => _dashboardContainerId;

        private ElementReference _dashboardElement;

        /// <summary>
        /// Exposes a Blazor <see cref = "ElementReference"/> of the wrapped around HTML element. 
        /// It can be used e.g. for JS interop, etc.
        /// </summary>
        public ElementReference InnerElementReference => _dashboardElement;

        [Inject]
        private IDashboardInteropService _dashboardService { get; set; } = default!;

        [Parameter]
        public bool AutoProceed { get; set; }

        [Parameter]
        public bool DarkMode { get; set; }

        [Parameter]
        public bool Disabled { get; set; }

        [Parameter]
        public string Note { get; set; } = default!;

        /// <summary>
        /// Blazor capture for any unmatched HTML attributes.
        /// </summary>
        [Parameter(CaptureUnmatchedValues = true)]
        public Dictionary<string, object>? AllOtherAttributes { get; set; }

        [Parameter]
        public Action? OnModalOpen { get; set; }

        [Parameter]
        public Action? OnModalClosed { get; set; }

        protected override async Task OnInitializedAsync()
        {
            await _dashboardService.InitDashboardAsync(DashboardId, DarkMode);

            await _dashboardService.OnModalOpen(DashboardId, DotNetObjectReference.Create(this), nameof(OnModalOpenCallback));
            await _dashboardService.OnModalClosed(DashboardId, DotNetObjectReference.Create(this), nameof(OnModalClosedCallback));
        }

        protected override async Task OnParametersSetAsync()
        {
            await _dashboardService.SetAutoProceed(AutoProceed);
            await _dashboardService.SetDarkMode(DarkMode);
            await _dashboardService.SetNote(Note);
        }

        [JSInvokable]
        public void OnModalOpenCallback() => OnModalOpen?.Invoke();

        [JSInvokable]
        public void OnModalClosedCallback() => OnModalClosed?.Invoke();

        #region IAsyncDisposable
        public async ValueTask DisposeAsync()
        {
            if (_dashboardService is not null) { await _dashboardService.DisposeAsync(); }
        }

        #endregion        
    }
}