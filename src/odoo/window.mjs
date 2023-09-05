function changeWindowTitle(title) {
    /* Change the window title */
    document.dispatchEvent(
        new CustomEvent(
            'odoo_change_title', {
                detail: title
            }
        )
    )
}



export const OdooWindow = {
    changeWindowTitle: changeWindowTitle
}