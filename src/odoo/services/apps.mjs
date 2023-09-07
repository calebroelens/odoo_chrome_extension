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
    return OdooServices.getOdooWOWL_root_service("hm").hasHomeMenu;
}

export const OdooApps = {
    getOdooCurrentApp: getOdooCurrentApp,
    getAllOdooMenuItems: getAllOdooMenuItems,
    getOdooInstalledAppIcons: getOdooInstalledAppIcons,
    isHomeMenu: isHomeMenu
}