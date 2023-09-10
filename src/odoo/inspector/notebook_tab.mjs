import {OdooNotification} from "../services/notification.mjs";


let checkForNotebookTab = (contextEventData, clickData) => {
    if(contextEventData === null){
        OdooNotification.showNotification("Please wait a few seconds so the code can initialize :)", {'type': 'warning'});
        return;
    }
    let target = contextEventData.target;
    if(
        target.className && target.className.includes("nav-link")
        && target.role && target.role === "tab"
        && target.href && target.href.includes('notebook_page')
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

}


export const ContextMenuDetect_NotebookTab = {
    checkForNotebookTab: checkForNotebookTab,
    renderNotebookTabInspector: renderNotebookTabInspector
}