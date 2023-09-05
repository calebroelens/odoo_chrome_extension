console.log("Injector loading");

(() => {
    /* Always run code */

    /* Dispatch odoo state */
    let odoo_loaded = window.hasOwnProperty('odoo');
    document.dispatchEvent(new CustomEvent('odoo_loaded', {detail: odoo_loaded}));

    /* Catch service events */
    document.addEventListener("odoo_change_title", (ev) => {
        window.odoo.__DEBUG__.services["web.web_client"].set_title(ev.detail);
    });

    document.addEventListener("odoo_show_warning", (ev) => {
        new window.odoo.__DEBUG__['services']['web.Dialog'].alert(null, ev.detail.content, ev.detail.options);
    });

})();

console.log("Injector load complete");