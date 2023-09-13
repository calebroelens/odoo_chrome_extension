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
                    variant: null,
                    final_target: target,
                    data: {
                        field_name: field_data_element.name,
                        text_name: target.innerText,
                        field_value: field_value
                    }
                }
            }
        } else {
            // Wrapped in div
            if(target.parentElement.tagName === "DIV" && target.parentElement.className.includes('o_wrap_label')){
                let field_link_name = target.getAttribute('for');
                let field_data_element = document.getElementById(field_link_name);
                let field_value = null;
                if(field_data_element){
                    field_value = field_data_element.value;
                } else {
                    field_data_element = document.querySelector(`div[name='${field_link_name}'].o_readonly_modifier`);
                    if(field_data_element){
                        field_value = field_data_element.firstElementChild.value;
                    }
                }
                if(field_data_element && field_data_element.dataset.field){
                    field_link_name = field_data_element.dataset.field;
                }
                // Refactor this when I'm not lazy
                if(field_data_element.parentElement.className.includes('dropdown')){
                    if(field_data_element.parentElement.parentElement.className.includes('dropdown')){
                        if(field_data_element.parentElement.parentElement.parentElement.parentElement.getAttribute('name')){
                            field_link_name = field_data_element.parentElement.parentElement.parentElement.parentElement.getAttribute('name')
                        }
                    }
                }
                if(field_data_element.parentElement.className.includes('o_field_widget')){
                    if(field_data_element.parentElement.getAttribute('name')){
                        field_link_name = field_data_element.parentElement.getAttribute('name')
                    }
                }
                if(field_data_element.id && field_data_element.id.includes('_0')){
                    if(field_data_element.parentElement.tagName  === "DIV" && field_data_element.parentElement.className.includes('text')){
                        if(field_data_element.parentElement.parentElement.tagName === "DIV"
                            && field_data_element.parentElement.parentElement.getAttribute('name')){
                            field_link_name = field_data_element.parentElement.parentElement.getAttribute('name');
                        }
                    }
                }
                return {
                    type: 'field',
                    variant: null,
                    final_target: target,
                    data: {
                        field_name: field_link_name,
                        text_name: target.innerText,
                        field_value: field_value
                    }
                }

            }
        }
    } else if (target.tagName === "SELECT" && target.id){
        // Might be a select field input

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