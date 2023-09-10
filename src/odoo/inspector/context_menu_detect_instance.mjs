import {ContextMenuDetect_Apps} from "./apps.mjs";
import {OdooNotification} from "../services/notification.mjs";
import {ContextMenuDetect_NotebookTab} from "./notebook_tab.mjs";
import {ContextMenuDetect_Field} from "./fields.mjs";

const EXTRACTORS = [
    ContextMenuDetect_Apps.checkForAppIconInstance,
    ContextMenuDetect_NotebookTab.checkForNotebookTab,
    ContextMenuDetect_Field.checkForField
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
        switch(response.type){
            case "app":
                ContextMenuDetect_Apps.renderAppIconInspector(response);
                break;
            case "notebook_tab":
                ContextMenuDetect_NotebookTab.renderNotebookTabInspector(response);
                break;
            case "field":
                ContextMenuDetect_Field.renderFieldInspector(response);
        }
    }
}



export const ContextMenuDetect = {
    contextMenuTargetExtractor: contextMenuTargetExtractor
}