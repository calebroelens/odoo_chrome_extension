/*
    Odoo runs the OWL framework
    Expose and abuse the shit out of it :p

 */

import {OdooVersion} from "../version.mjs";
import {OdooServices} from "../services.mjs";

let getOwlLoaderModules = () => {
    if(Object.hasOwn(window.odoo, 'loader')){
        // Loader found!
        let modules = window.odoo.loader.modules;
        for(let module of modules.entries()){
            modules[module['0']] = module['1']
        }
        return modules;
    }
    return {};
}

let renderXmlTemplate = (xml) => {
    let odoo_version = OdooVersion.getOdooVersion();
    if(odoo_version[0] === 16){
        return window.owl.xml`${xml}`;
    } else {
        return window.owl.tags.xml`${xml}`;
    }
}


let getOwlComponent = (moduleName) => {
    let odoo_version = OdooVersion.getOdooVersion();
    console.log(`[OED] Loading owl component for ${odoo_version[0]}.${odoo_version[1]}`);
    if(odoo_version[1] > 1 && odoo_version[0] === 16){
        // Use global module loader
        let modules = getOwlLoaderModules();
        return modules[moduleName];
    }
    else {
        // Use global internal service loader
        return OdooServices.getOdooService(moduleName);
    }
}

export const OdooOwl = {
    getOwlComponent: getOwlComponent,
    renderXmlTemplate: renderXmlTemplate
}