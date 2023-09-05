console.log("Injector loading");

(() => {
    /* Always run code */
    document.addEventListener("odoo_change_title", (ev) => {
        window.odoo.__DEBUG__.services["web.web_client"].set_title(ev.detail);
    });
})();

console.log("Injector load complete");