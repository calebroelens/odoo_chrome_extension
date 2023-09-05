import {createFloatingDebugButton} from "./controls/floating_debug_button.mjs";
import {isOdooSession} from "./odoo/session.mjs";


let setupWindowObjectInjector = () => {
    let injector_script = document.createElement("script");
    injector_script.src = chrome.runtime.getURL("src/injector.js");
    injector_script.onload = () => {};
    (document.head ||document.documentElement).appendChild(injector_script);
    console.log("Injector injected");
}

let toggleDebug = () => {
    // Setup injector
    if(!window.timeoutDebug){
        if(document.querySelector(".debug_float")){
            document.querySelector(".debug_float").remove();
            document.dispatchEvent(new CustomEvent('odoo_change_title', {detail: 'Debugger disabled'}));
        }
        else {
            document.dispatchEvent(new CustomEvent('odoo_change_title', {detail: 'Debugger enabled'}));
            let body = document.getElementsByTagName("body")[0];
            body.appendChild(
                createFloatingDebugButton(
                    document
                )
            );
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
}


