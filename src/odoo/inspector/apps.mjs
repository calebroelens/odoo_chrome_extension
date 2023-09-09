import {OdooDialog} from "../services/dialog.mjs";
import {OdooOwl} from "../owl/owl.mjs";
import {OdooNotification} from "../services/notification.mjs";
import {AppInspectorTemplates} from "./templates/apps.mjs";
import {OdooVersion} from "../version.mjs";

let checkForAppIconInstance = (contextEventData, clickData) => {
    // Clicked on the image
    if(contextEventData === null){
        OdooNotification.showNotification("Please wait a few seconds so the code can initialize :)", {'type': 'warning'});
        return;
    }
    let target = contextEventData.target;
    if(target.previousSibling){
        if(target.previousSibling.className && target.previousSibling.className.includes("o_app_icon")){
            target = target.previousSibling;
        }
    }
    if(target.className.includes('o_app_icon')){
        let parent = target.parentElement;
        if(parent.tagName === "A" && parent.role === "option" && parent.dataset.menuXmlid){
            return {
                'type': 'app',
                'final_target': parent,
                'data': {
                    'xml_id': parent.dataset.menuXmlid,
                    'href': parent.href,
                    'name': parent.children.item(1).innerText
                }
            }
        }
    }
    return null;
}

let renderAppIconInspector = async (contextEventDataResponse) => {
    let templates = AppInspectorTemplates[OdooVersion.getOdooVersion()[0]]["dialog"];
    let dialog = OdooDialog.renderCustomDialog("Custom dialog", "Hacked custom template", templates);
    OdooDialog.showDialog(dialog.class, dialog.props);
    let dialog_2 = OdooDialog.createDialog("Default dialog", "This is a body");
    OdooDialog.showDialog(dialog_2.class, dialog_2.props);
}

export const ContextMenuDetect_Apps = {
    checkForAppIconInstance: checkForAppIconInstance,
    renderAppIconInspector: renderAppIconInspector
}