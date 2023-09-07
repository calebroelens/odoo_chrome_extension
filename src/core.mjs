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

let setupMessageActionListeners = (function_map) => {
    chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {

    });
}

let addEventListener = (event_name, callback) => {
    document.addEventListener(event_name, (ev) => {
        callback(ev.detail);
    });
}

let addAsyncEventListener = async (event_name, callback) => {
    document.addEventListener(event_name, async (ev) => {
        await callback(ev.detail);
    })
}

export async function run(){
    // Load script and inject
    startInjection();
}


