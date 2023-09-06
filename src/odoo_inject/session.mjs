import {getOdooService} from "./services.mjs";

export let getOdooSession = () => {
    // Depending on version, the session can be located in different locations
    let session_object = getOdooService('web.session', '@web/session');
    // No session object found
    if(!session_object){
        return odoo.session_info;
    }
    if(Object.hasOwn(session_object, 'session')){
        return session_object.session;
    }
    return session_object;
}

export let getOdooVersion = () => {
    return (
        getOdooSession()?.server_version || '16.0+e'
    );
}

export let getOdooVersionMajor = () => {
    return Number(getOdooVersion().split('.', 1)[0]);
}

