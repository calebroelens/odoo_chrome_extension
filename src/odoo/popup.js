

let showWarning = (title, content, size="lg", header=true, fullscreen=false) => {
    let options = {title: title, header: header, size: size, fullscreen: fullscreen};
    document.dispatchEvent(new CustomEvent("odoo_show_warning", {detail: {content: content, options: options}}))
}


export const Popup = {
    showWarning: showWarning
}