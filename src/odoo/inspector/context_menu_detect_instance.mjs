import {ContextMenuDetect_Apps} from "./apps.mjs";
import {OdooNotification} from "../services/notification.mjs";

const EXTRACTORS = [
    ContextMenuDetect_Apps.checkForAppIconInstance
];

let contextMenuTargetExtractor = async (contextEventData, clickData) => {
    // Detect type and return data
    // Inspect the target for its properties and try to assume the type
    let response = null;
    for(let extractor of EXTRACTORS){
        response = extractor(contextEventData, clickData);
        if(response){
            break;
        }
    }
    if(!response){
        OdooNotification.showNotification("Could not detect type of inspected element.", {'type': 'warning'})
    }
    else {
        OdooNotification.showNotification(`Detected type ${response.type}. Rendering details...`, {'type': 'success'});
        await ContextMenuDetect_Apps.renderAppIconInspector(response);
    }

}



export const ContextMenuDetect = {
    contextMenuTargetExtractor: contextMenuTargetExtractor
}