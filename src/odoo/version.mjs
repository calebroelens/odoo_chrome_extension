/*
    For some version, features are missing
    Limit these features using listeners

 */

import {OdooServices} from "./services.mjs";

let getOdooVersion = () => {
    return odoo.info.server_version_info;
}

export const OdooVersion = {
    getOdooVersion: getOdooVersion
}