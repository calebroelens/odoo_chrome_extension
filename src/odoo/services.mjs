// This cache will save the keys of the service in the script, to avoid repeated fetching of the service functions (costly copy operations)
const __DEBUG__service_cache = {};
const __WOWL_DEBUG__service_cache = {};

let getOdooService = (...service_names) => {
    // Legacy JS services
    const service_names_set = Array.from(new Set(service_names));
    // Return from service cache if possible
    if(Object.hasOwn(__DEBUG__service_cache, service_names_set)){
        return __DEBUG__service_cache[service_names_set]
    }
    // Check the window object
    const service = Array.from(service_names_set).find(
        service_name => Object.hasOwn(odoo.__DEBUG__.services, service_name)
    );
    if(service){
        const service = odoo.__DEBUG__.services[service_name];
        // Add to the cache
        __DEBUG__service_cache[service_names_set] = service;
        return service;
    }
    return null;
}

let getOdooWOWL_service = (service_name) => {
    // Starting from Odoo 15 till 17, Odoo Owl was introduced
    if(Object.hasOwn(__WOWL_DEBUG__service_cache, service_name)){
        return __WOWL_DEBUG__service_cache[service_name];
    }
    // Check the window object
    if(Object.hasOwn(odoo.__WOWL_DEBUG__.root.env.services, service_name)){
        const service = odoo.__WOWL_DEBUG__.root.env.services[service_name];
        __WOWL_DEBUG__service_cache[service_name] = service;
        return service;
    }
    return null;
}


export const OdooServices = {
    getOdooService: getOdooService,
    getOdooWOWL_service: getOdooWOWL_service
}