import {OdooNotification} from "../services/notification.mjs";
import {NotebookTabInspectorTemplates} from "./templates/notebook_tab.mjs";
import {OdooVersion} from "../version.mjs";
import {OdooDialog} from "../services/dialog.mjs";


let checkForNotebookTab = (contextEventData, clickData) => {
    if(contextEventData === null){
        OdooNotification.showNotification("Please wait a few seconds so the code can initialize :)", {'type': 'warning'});
        return;
    }
    let target = contextEventData.target;
    console.log(target);
    if(
        target.className && target.className.includes("nav-link")
        && target.role && target.role === "tab"
    ){
        return {
            type: 'notebook_tab',
            final_target: target,
            data: {
                href: target.href,
                name: target.name
            }
        }
    }
    return null;
}

let renderNotebookTabInspector = (contextEventDataResponse) => {
    let templates = NotebookTabInspectorTemplates[OdooVersion.getOdooVersion()[0]]["dialog"];
    let dialog = OdooDialog.renderCustomDialog(
        "Inspect: Notebook Tab",
        "",
        {
            ...contextEventDataResponse
        },
        templates
    );
    OdooDialog.showDialog(dialog.class, dialog.props);
}


export const ContextMenuDetect_NotebookTab = {
    checkForNotebookTab: checkForNotebookTab,
    renderNotebookTabInspector: renderNotebookTabInspector
}