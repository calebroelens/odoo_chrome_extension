/*
    For some version, features are missing
    Limit these features using listeners

 */

import {OdooServices} from "./services.mjs";

let getOdooVersion = () => {
    return OdooServices.getOdooService('root.widget', '@web.session').session.server_version_info;
}

export const OdooVersion = {
    getOdooVersion: getOdooVersion
}