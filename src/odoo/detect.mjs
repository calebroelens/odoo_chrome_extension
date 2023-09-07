/*

 */

// Detect if there is any odoo instance running and detect any states

let isOdooAvailable = () => {
    return Object.hasOwn(window, 'odoo');
}

let isOdooLoggedIn = () => {
    return Object.hasOwn(window.odoo, '__WOWL_DEBUG__');
}

export const OdooDetection = {
    isOdooAvailable: isOdooAvailable,
    isOdooLoggedIn: isOdooLoggedIn
}