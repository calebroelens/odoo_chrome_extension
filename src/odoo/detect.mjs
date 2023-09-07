/*

 */

// Detect if there is any odoo instance running and detect any states

let isOdooAvailable = () => {
    return Object.hasOwn(window, 'odoo');
}

let isOdooLoggedIn = () => {
    return Object.hasOwn(window.odoo, '__WOWL_DEBUG__');
}

let detectDebugMode = () => {
    if(isOdooAvailable()){
        if(odoo.debug === "1"){
            return "DEBUG";
        }
        else if(odoo.debug === "assets"){
            return "ASSETS"
        } else {
            return null;
        }
    }
    else{
        return null;
    }
}

export const OdooDetection = {
    isOdooAvailable: isOdooAvailable,
    isOdooLoggedIn: isOdooLoggedIn,
    detectDebugMode: detectDebugMode
}