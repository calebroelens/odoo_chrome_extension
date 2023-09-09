/*
    Odoo runs the OWL framework
    Expose and abuse the shit out of it :p

 */

import {OdooVersion} from "../version.mjs";

let getOwlLoaderModules = () => {
    if(Object.hasOwn(window.odoo, 'loader')){
        // Loader found!
        let modules = window.odoo.loader.modules;
        for(let module of modules.entries()){
            console.log(module);
            modules[module['0']] = module['1']
            console.log(module['1']);
        }
        return modules;
    }
    return {};
}

let getOwlComponent = (moduleName) => {
    let odoo_version = OdooVersion.getOdooVersion();
    if(odoo_version[1] > 1){
        // Use global module loader
        let modules = getOwlLoaderModules();
        return modules[moduleName];
    }
}

export const OdooOwl = {
    getOwlComponent: getOwlComponent
}