console.log("Injector loading");

(() => {
    /* Always run code */

    let getOdooService = (service_name) => {
        return window.odoo.__DEBUG__['services'][service_name];
    }

    /* Dispatch odoo state */
    let odoo_loaded = window.hasOwnProperty('odoo');
    document.dispatchEvent(new CustomEvent('odoo_loaded', {detail: odoo_loaded}));

    /* Catch service events */
    document.addEventListener("odoo_change_title", (ev) => {
        getOdooService("web.web_client").set_title(ev.detail);
    });

    document.addEventListener("odoo_show_warning", (ev) => {
        new getOdooService('web.Dialog').alert(null, ev.detail.content, ev.detail.options);
    });

    document.addEventListener("odoo_notification", (ev) => {
        odoo.__DEBUG__.messaging.notify(ev.detail)
    })

})();

console.log("Injector load complete");