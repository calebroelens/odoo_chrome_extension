/*
    Extension on the click everywhere test.
    Allows selection of app
    $.getScript('web/static/src/js/tools/test_menus.js').then(function() { clickEverywhere('menu_id')});
 */


import {OdooVersion} from "../version.mjs";
import {OdooOwl} from "../owl/owl.mjs";
import {OdooApps} from "../services/apps.mjs";
import {OdooServices} from "../services.mjs";

const CLICK_EVERYWHERE_LOCATION = ["web/static/src/webclient/clickbot/clickbot.js"];

let clickEverywhereByXmlId = async (xml_id) => {
    let odoo_version = OdooVersion.getOdooVersion();
    if(odoo_version[0] === 16){
        // V17 / preview V16.5
        if(odoo_version[1] > 1){
            let clickbot = OdooOwl.getOwlComponent("@web/webclient/clickbot/clickbot_loader");
            clickbot.startClickEverywhere(xml_id, false);
        }
        else {
            let clickbot_loader = OdooOwl.getOwlComponent("@web/core/assets");
            await clickbot_loader.loadJS("web/static/src/webclient/clickbot/clickbot.js").then(() => {
                let app_details = OdooApps.getAppDetails(xml_id);
                OdooServices.getOdooWOWL_service("menu").setCurrentMenu(app_details.id);
                window.clickEverywhere(xml_id);

            });
        }

    } else {
        // V15
    }
    // odoo.loader.modules.get('@web/webclient/clickbot/clickbot_loader');
}



export const Odoo_ClickEverywhere = {
    clickEverywhereByXmlId: clickEverywhereByXmlId
}