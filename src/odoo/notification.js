
let showNotification = (params) => {
    document.dispatchEvent(
        new CustomEvent('odoo_notification', {detail: params})
    )
}

export const Notification = {
    showNotification: showNotification
}