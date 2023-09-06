import {getOdooVersionMajor} from "./session.mjs";

const service_cache = {};

// The env bus can be used to send notifications!
// Ex.: odoo.__DEBUG__['services']['root.widget'].env.services.notification.notify({'title': 'test'})

// Inspired by Odoo Terminal
let getOdooService = (...service_names) => {
    // Check if the service is cached
    const service_names_set = Array.from(new Set(service_names));
    if(Object.hasOwn(service_cache, service_names_set)){
        return service_cache[service_names_set];
    }
    // Check if the odoo object has the service
    const service_name = Array.from(service_names_set).find(
        s_name => Object.hasOwn(odoo.__DEBUG__.services, s_name)
    );
    // Add to cache if found and return the service
    if(service_name){
        const service = odoo.__DEBUG__.services[service_name];
        // Add to cache
        service_cache[service_names_set] = service;
        return service;
    }
    return null;
}

let getOdooRoot = () => {
    return getOdooService('root.widget', 'web.web_client');
}

async function doAction(action, options) {
    const odooVersion = getOdooVersionMajor();
    if(odooVersion >= 15){
        getOdooRoot().env.bus.trigger('do-action', {
            action: action,
            options: options
        });
        // Simulate end of the action
        setInterval(
            () => {return {id: action}},
            1800
        );
    }
    else {
        return new Promise((resolve, reject) => {
            getOdooRoot().trigger_up('do_action', {
                action: action,
                options: options,
                on_success: resolve,
                on_fail: reject
            });
        })
    }
}

async function doCall(service, method) {
    const odooVersion = getOdooVersionMajor();
    const callArguments = Array.prototype.slice.call(arguments, 2);
    let callResult = null;
    const callTrigger =
        odooVersion >= 15 ?
            getOdooRoot().env.bus.trigger : getOdooRoot().trigger_up;
    trigger.bind(getOdooRoot())('call_service', {
        service: service,
        method: method,
        args: callArguments,
        callback: function(r) {
            callResult = r;
        }
    });
    return callResult;
}

function executeAction(payload) {
    const OdooVer = getOdooVersionMajor();
    if (OdooVer < 15) {
        return;
    }
    getOdooRoot().env.bus.trigger('execute-action', payload);
}


export const Services = {
    getOdooService: getOdooService,
    getOdooRoot: getOdooRoot,
    doAction: doAction,
    executeAction: executeAction
}


