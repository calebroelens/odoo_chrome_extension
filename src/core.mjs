import {OdooNotification} from "./odoo/services/notification.mjs";
import {Odoo_ClickEverywhere} from "./odoo/debug/click_everywhere.mjs";

const INJECT_SCRIPTS = [];

const INJECT_MODULES = ["src/injector.mjs"];

const INJECT_CLASS = "odoo_extended_debugger_js";

let __injectScript = (url, type="script") => {
    /* Load a script in any page and hack the DOM window */
    let injector_tag = document.createElement("script");
    injector_tag.src = chrome.runtime.getURL(url);
    injector_tag.onload = () => {};
    if(type !== "script"){
        injector_tag.type = type;
    }
    (document.head || document.documentElement).appendChild(injector_tag);
}

let injectModule = (url) => {
    console.log(`[OED] Injecting module (ES6): ${url}`);
    __injectScript(url, "module");
    console.log(`[OED] Injected module ${url}`);
}

let injectScript = (url) => {
    console.log(`[OED] Injecting script: ${url}`);
    __injectScript(url);
    console.log(`[OED] Injected script ${url}`);
}

let startInjection = () => {
    console.log("[OED] Started injection.");
    for(let script_url of INJECT_SCRIPTS){
        injectScript(script_url);
    }
    for(let module_url of INJECT_MODULES){
        injectModule(module_url);
    }
    console.log("[OED] End of injection.");
}

let setupMessageActionListeners = () => {
    chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
        if(data.action === "context_menu_click"){
            // Pass to injector.mjs
            document.dispatchEvent(new CustomEvent("context_menu_click_inject", {detail: data.clickData}));
        }
    });
}

let setupEventListeners = () => {
    document.addEventListener("show_context_menu", (ev) => {
        chrome.runtime.sendMessage({request: "show_context_menu"});
    });
}


export async function run(){
    // Load script and inject
    startInjection();
    setupEventListeners();
    setupMessageActionListeners();
}


