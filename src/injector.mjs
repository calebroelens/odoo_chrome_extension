import {OdooDetection} from "./odoo/detect.mjs";
import {OdooNotification} from "./odoo/services/notification.mjs";
import {OdooApps} from "./odoo/services/apps.mjs";
import {DebugApps} from "./odoo/dom/debug_apps.mjs";

window.RUN_MODE = "DISABLED";
let INITIAL_URL = window.location.href;

console.log("[OED] Injector loading");

let RUN_MODE_FULL = () => {
    // Load menus
    DebugApps.loadAppMenus();
}

let RUN_MODE_WEBSITE = () => {

}

let RUN_MODE_DISABLED = () => {

}

let UrlObserver = () => {

    if(INITIAL_URL !== window.location.href) {
        document.dispatchEvent(
            new CustomEvent("odoo_url_change", {detail: {"previous": INITIAL_URL, "current": window.location.href,}})
        );
        INITIAL_URL = window.location.href;
    }
    setTimeout(UrlObserver, 100);

}

let appMenuObserver = () => {
    if(OdooApps.isHomeMenu()){
        DebugApps.loadAppMenus();
    }
    setTimeout(appMenuObserver, 100);
}

const RUN_MODES = {
    "FULL": RUN_MODE_FULL,
    "WEBSITE": RUN_MODE_WEBSITE,
    "DISABLED": RUN_MODE_DISABLED
};

let runPopStateInjection = () => {
    /* When popstate gets triggered re-inject some elements into the DOM */
    if(window.RUN_MODE === "FULL"){

    }
}

let init = () => {
    /* Always run code */
    if(OdooDetection.isOdooAvailable() && OdooDetection.isOdooLoggedIn()){
        window.RUN_MODE = "FULL";
    } else if(OdooDetection.isOdooAvailable() && !OdooDetection.isOdooLoggedIn()){
        window.RUN_MODE = "WEBSITE"
    } else {
        window.RUN_MODE = "DISABLED"
    }
    console.log(`[OED] Run mode: ${window.RUN_MODE}`);
    // Set core listeners
    if(window.RUN_MODE !== "DISABLED"){
        OdooNotification.showNotification(
            `Odoo Extended Debugging loaded in ${window.RUN_MODE} run mode.`,
            {'title': 'OED Loaded', 'type': 'success'}
        );
        document.addEventListener("odoo_url_change", (ev) => {
            console.log("[OED] Event: URL changed");
            // Trigger re-injection of some scripts!
            runPopStateInjection();
        });
        // Start observers
        setTimeout(UrlObserver, 100);
        if(window.RUN_MODE === "FULL"){
            setTimeout(appMenuObserver, 100);
        }
    }
    // Run the mode
    RUN_MODES[window.RUN_MODE]();
};

// No need for DOMContentLoaded! -> Already emitted
// Add a delay -> Odoo core takes to long to load on V17...
setTimeout(init, 100);

console.log("[OED] Injector load complete");