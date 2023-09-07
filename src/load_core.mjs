
const RUN_SCRIPTS = [
    'src/core.mjs'
];

let importContentScript = async (url) => {
    const src = chrome.runtime.getURL("src/core.mjs");
    return await import(src);
}

let init = async () => {
    for(let script of RUN_SCRIPTS){
        await importContentScript(script).then(
            (src) => {
                console.log(`[OED] Script ${script} loaded.`);
                src.run();
            }
        );
    }
}

init().then(() => {
    console.log("[OED] Loaded and running!");
});