
import {OdooServices} from "../services.mjs";
import {OdooOwl} from "../owl/owl.mjs";
import {OdooVersion} from "../version.mjs";


let showDialog = (dialog, properties) => {
    OdooServices.getOdooWOWL_service("dialog").add(dialog, properties);
}

let createConfirmationDialog = (title, body, confirm_callback, cancel_callback) => {
    let module = OdooOwl.getOwlComponent("@web/core/confirmation_dialog/confirmation_dialog");
    return {
        class: module.ConfirmationDialog,
        props: {
            title: title,
            body: body,
            confirm: confirm_callback,
            cancel: cancel_callback
        }
    }
}

let renderCustomDialog = (title, body, additional_props, templates) => {
    let module = OdooOwl.getOwlComponent("@web/core/confirmation_dialog/confirmation_dialog");
    let alertDialog = module.AlertDialog;

    class CustomAlertDialog extends alertDialog {
        setup(){
            super.setup();
        }
    }
    CustomAlertDialog.props = Object.assign(Object.create(alertDialog.props), {
        contentClass: { type: String, optional: true },
    });

    CustomAlertDialog.size = "modal-xl";

    // if(CustomAlertDialog.defaultProps){
    //     CustomAlertDialog.defaultProps.data = {optional: true};
    //     CustomAlertDialog.defaultProps.type = null;
    //     CustomAlertDialog.defaultProps.odoo_record = null;
    //     CustomAlertDialog.defaultProps.final_target = null;
    // }
    if(CustomAlertDialog.props){
        CustomAlertDialog.props.data = {optional: true};
        CustomAlertDialog.props.type = {optional: true};
        CustomAlertDialog.props.odoo_record = {optional: true};
        CustomAlertDialog.props.final_target = {optional: true};
    }

    for(let template_function of Object.keys(templates)){
        Object.defineProperty(
            CustomAlertDialog,
            template_function,
            {
                value: OdooOwl.renderXmlTemplate(templates[template_function]()),
                writable: true,
            }
        );
    }
    return {
        class: CustomAlertDialog,
        props: {
            title: title,
            body: body,
            ...additional_props
        }
    }
}

let createDialog = (title, body) => {
    let module = OdooOwl.getOwlComponent("@web/core/confirmation_dialog/confirmation_dialog");
    return {
        class: module.AlertDialog,
        props: {
            title: title,
            body: body
        }
    }
}



export const OdooDialog = {
    createConfirmationDialog: createConfirmationDialog,
    createDialog: createDialog,
    showDialog: showDialog,
    renderCustomDialog: renderCustomDialog
}