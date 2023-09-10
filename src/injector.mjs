import {OdooDetection} from "./odoo/detect.mjs";
import {OdooNotification} from "./odoo/services/notification.mjs";
import {OdooApps} from "./odoo/services/apps.mjs";
import {DebugApps} from "./odoo/dom/debug_apps.mjs";
import {ContextMenuDetect} from "./odoo/inspector/context_menu_detect_instance.mjs";
import {Odoo_ClickEverywhere} from "./odoo/debug/click_everywhere.mjs";
import {OdooDialog} from "./odoo/services/dialog.mjs";

window.RUN_MODE = "DISABLED";
let INITIAL_URL = window.location.href;
let CONTEXT_DATA = null;

console.log("[OED] Injector loading");


let getCurrentElement = null;
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

let initContextMenu = () => {
    document.dispatchEvent(new CustomEvent("show_context_menu", {detail: window.RUN_MODE}));
}

let registerTestNotificationListener = () => {
    document.addEventListener("test_show_notification", (ev) => {
        OdooNotification.showNotification(ev.detail.message, {});
    });
}

let registerContextClickListener = () => {
    document.addEventListener('contextmenu', (ev) => {
       CONTEXT_DATA = ev;
    })
}

let registerContextMenuListener = () => {
    document.addEventListener("context_menu_click_inject", (ev) => {
        ContextMenuDetect.contextMenuTargetExtractor(CONTEXT_DATA, ev.detail);
    })
}

let registerClickEverywhereTestListener = () => {
    document.addEventListener("odoo_debug_click_everywhere_xmlid", (ev) => {
        let details = OdooApps.getAppDetails(ev.detail);
        // Setup home menu button
        Odoo_ClickEverywhere.clickEverywhereByXmlId(ev.detail);

    });
}

let registerChromeResourcesEvent = () => {
    document.addEventListener("odoo_debug_chrome_suspend", (ev) => {
        let dialog = OdooDialog.createDialog(
            ev.detail
        );
        OdooDialog.showDialog(dialog);
    });
}

let registerListeners = () => {
    registerTestNotificationListener();
    registerContextClickListener();
    registerContextMenuListener();
    registerClickEverywhereTestListener();
    registerChromeResourcesEvent();
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
        // Start context menu
        initContextMenu();
        registerListeners();
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
setTimeout(init, 1500);

console.log("[OED] Injector load complete");