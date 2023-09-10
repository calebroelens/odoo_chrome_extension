import {OdooNotification} from "../services/notification.mjs";


let checkForField = (contextEventData, clickData) => {
    if(contextEventData === null){
        OdooNotification.showNotification("Please wait a few seconds so the code can initialize :)", {'type': 'warning'});
        return null;
    }
    let target = contextEventData.target;
    console.log(target);
    // A lot of scanning is required :(

    // Case 1: Clicked the label
    if(target.tagName && target.tagName === "LABEL" && target.className.includes("o_form_label")){
        if(target.parentElement.tagName === "TD" && target.getAttribute('for')){
            // V15
            let field_data_element = document.getElementById(target.getAttribute('for'));
            if(field_data_element){
                let field_value = null;
                if(field_data_element.tagName === "INPUT"){
                    field_value = field_data_element.value;
                } else {
                    field_value = field_data_element.parentElement.innerText;
                }
                return {
                    type: 'field',
                    final_target: target,
                    data: {
                        href: field_data_element.href,
                        field_name: field_data_element.name,
                        text_name: target.innerText,
                        field_value: field_value
                    }
                }
            }
        }
    }
    // Case 2: Clicked TD tag (V15)
    if(target.tagName && target.tagName === "TD" && target.className.includes("o_td_label")){

    }
    // Case 3: Div surrounding label
    if(target.tagName && target.tagName === "DIV" && target.className.includes("o_wrap_label")){

    }

    return null;
}

let outerTagIsTd = (td_tag) => {

}

let renderFieldInspector = (contextEventDataResponse) => {
    console.log(contextEventDataResponse);
}

export const ContextMenuDetect_Field = {
    checkForField: checkForField,
    renderFieldInspector: renderFieldInspector
}