/*
    App service

 */

import {OdooServices} from "../services.mjs";

let getOdooInstalledAppIcons = () => {
    return OdooServices.getOdooWOWL_root_service("menuService").getApps();
}

let getOdooCurrentApp = () => {
    return OdooServices.getOdooWOWL_root_service("menuService").getCurrentApp();
}

let getAllOdooMenuItems = () => {
    return OdooServices.getOdooWOWL_root_service("menuService").getAll();
}

let isHomeMenu = () => {
    let service = OdooServices.getOdooWOWL_root_service("hm");
    if(service){
        return service.hasHomeMenu;
    } else {
        return false;
    }

}

let getAppDetails = (xml_id) => {
    let apps = getAllOdooMenuItems();
    for(let app of apps){
        if(app.xmlid === xml_id){
            return app;
        }
    }
    return {}
}

export const OdooApps = {
    getOdooCurrentApp: getOdooCurrentApp,
    getAllOdooMenuItems: getAllOdooMenuItems,
    getAppDetails: getAppDetails,
    getOdooInstalledAppIcons: getOdooInstalledAppIcons,
    isHomeMenu: isHomeMenu
}