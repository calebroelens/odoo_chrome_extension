
let load_core = async () => {
    /* Load EJS Core */
    const src = chrome.runtime.getURL('src/core.mjs');
    const contentScript = await import(src);
    contentScript.run(/* chrome: no need to pass it */);
}
load_core().then(() => {
    console.log("Run");
});
