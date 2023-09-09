import {OdooDialog} from "../services/dialog.mjs";
import {OdooOwl} from "../owl/owl.mjs";

let checkForAppIconInstance = (contextEventData, clickData) => {
    // Clicked on the image
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

let _s_callback = () => {}
let _f_callback = () => {}

let renderAppIconInspector = async (contextEventDataResponse) => {
    let dialog = OdooDialog.createConfirmationDialog("test", "<h1>test</h1>", _s_callback, _f_callback);
    OdooDialog.showDialog(dialog.class, dialog.props);
}

export const ContextMenuDetect_Apps = {
    checkForAppIconInstance: checkForAppIconInstance,
    renderAppIconInspector: renderAppIconInspector
}