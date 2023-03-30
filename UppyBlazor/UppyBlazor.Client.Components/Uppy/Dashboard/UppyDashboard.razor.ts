import Uppy, { UppyOptions } from '@uppy/core';
import Dashboard, { DashboardOptions } from '@uppy/dashboard';
import Tus from '@uppy/tus';

//import '@uppy/core/dist/style.css';
//import '@uppy/dashboard/dist/style.css';

interface IComponentInstance {
    invokeMethodAsync: (methodName: string, ...args: any[]) => void;
}

interface IDashboardFunctions {
    setAutoProceed: (autoProceed: boolean) => void;
    setDarkMode: (enabled: boolean) => void;
    setDisabled: (disabled: boolean) => void;
    setNote: (note: string) => void;
    setDashboardOptions: (options: Partial<DashboardOptions>) => void;
    setUppyOptions: (options: Partial<UppyOptions>) => void;

    onModalOpen: (selectorId: string, component: IComponentInstance, methodName: string) => void;
    onModalClosed: (selectorId: string, component: IComponentInstance, methodName: string) => void;
}

class UppyDashboard implements IDashboardFunctions {

    uppy: Uppy;
    resizeObserver: ResizeObserver | undefined;

    constructor(selectorId: string, endpoint: string, darkMode: boolean) {
        this.uppy = new Uppy({ id: selectorId, autoProceed: true, debug: true })
            .use(Dashboard, {
                target: `#${selectorId}`,
                inline: true,
                showProgressDetails: true,
                proudlyDisplayPoweredByUppy: true,
                theme: darkMode ? 'dark' : 'light'                
            })
            .use(Tus, { endpoint: endpoint });

        this.startListeningToResize(selectorId)
    }

    // Set Dashboard specific options
    setDashboardOptions(options: Partial<DashboardOptions>) {
        const dashboard = this.uppy.getPlugin('Dashboard');
        dashboard?.setOptions(options);
    }

    // Set Uppy specific options
    setUppyOptions(options: Partial<UppyOptions>) {
        this.uppy.setOptions(options);
    }

    setAutoProceed(autoProceed: boolean) {
        this.setUppyOptions({ autoProceed: autoProceed });
    }
    
    setDarkMode(enabled: boolean) {
        this.setDashboardOptions({ theme: enabled ? 'dark' : 'light' });
    }

    setDisabled(disabled: boolean) {
        this.setDashboardOptions({ disabled: disabled });
    }

    setNote(note: string) {
        this.setDashboardOptions({ note: note });
    }

    onModalOpen(selectorId: string, component: IComponentInstance, methodName: string)
    {
        const handler = () => {
            if (component != null) {
                component.invokeMethodAsync(methodName);
                return;
            }
            console.warn("BlazorUppy:: JS callback executed after Blazor component unmounted.");
        };
        this.uppy.on("dashboard:modal-open", handler);
    }

    onModalClosed(selectorId: string, component: IComponentInstance, methodName: string) {
        const handler = () => {
            if (component != null) {
                component.invokeMethodAsync(methodName);
                return;
            }
            console.warn("BlazorUppy:: JS callback executed after Blazor component unmounted.");
        };
        this.uppy.on("dashboard:modal-closed", handler);
    }

    // Resizing

    startListeningToResize(selectorId: string) {
        // Watch for Dashboard container resize
        // and update width/height accordingly.
        this.resizeObserver = new ResizeObserver((entries) => {
            const uppyDashboardInnerEl = entries[0];
            const { width, height } = uppyDashboardInnerEl.contentRect;

            this.setDashboardOptions({
                width: width,
                height: height
            });
        });
        this.resizeObserver.observe(document.getElementById(selectorId)!);
    }

    stopListeningToResize() {
        this.resizeObserver?.disconnect();
    }

    // End Resizing
}

export function initDashboardInstance(selectorId: string, endpoint: string, darkMode: boolean): UppyDashboard {

    // Load the CSS **Temporary until I can find a way to use the 
    // Uppy CSS with CSS Isolation
    var element = document.createElement("link");
    element.setAttribute("rel", "stylesheet");
    // element.setAttribute("type", "text/css");
    // element.setAttribute("href", "./_content/UppyBlazor.Client.Components/uppy.css");
    element.setAttribute("href", " https://releases.transloadit.com/uppy/v3.6.1/uppy.min.css");
   
    document.getElementsByTagName("head")[0].appendChild(element);

    return new UppyDashboard(selectorId, endpoint, darkMode);
}









