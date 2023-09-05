import {isOdooSession} from "./odoo/session.mjs";
import {OdooWindow} from "./odoo/window.mjs";
import {OdooInspector} from "./controls/inspector.mjs";
import {Popup} from "./odoo/popup.js";
import { Notification} from "./odoo/notification.js";


let setupWindowObjectInjector = () => {
    /* Load script in any page */
    let injector_script = document.createElement("script");
    injector_script.src = chrome.runtime.getURL("src/injector.js");
    injector_script.onload = () => {};
    (document.head ||document.documentElement).appendChild(injector_script);
    console.log("Injector injected");
}

let toggleDebug = () => {
    // Setup injector
    if(!window.timeoutDebug){
        window.odoo_extensive_debugging_enabled = !window.odoo_extensive_debugging_enabled
        if(!window.odoo_extensive_debugging_enabled){
            OdooWindow.changeWindowTitle("Debugger disabled");
            OdooInspector.removeInspectorBar(document);
        }
        else {
            OdooWindow.changeWindowTitle("Debugger enabled");
            OdooInspector.createInspectorBar(document);
            Notification.showNotification({'title': "Odoo Extensive Debugging", "message": "Patches have been loaded!", "type": "success"});
        }

        window.timeoutDebug = true;
        setInterval(() => {
            window.timeoutDebug=false
            }, 250
        );
    }
}

export async function run(){
    setupWindowObjectInjector();

    chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
        if(data.action === "toggle_debug"){
            toggleDebug();
        }
    })

    document.addEventListener("odoo_loaded", (ev) => {
        window.allow_debugger = ev.detail;
    });
}


