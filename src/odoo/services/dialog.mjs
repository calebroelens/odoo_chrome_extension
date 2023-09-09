
import {OdooServices} from "../services.mjs";
import {OdooOwl} from "../owl/owl.mjs";


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

let generateXmlTemplateRender = () => {
    return window.owl.xml`
    <Dialog size="'sm'" title="props.title" contentClass="props.contentClass">
      <p t-out="props.body" class="text-prewrap"/>
      <t t-set-slot="footer">
        <button class="btn" t-att-class="props.confirmClass" t-on-click="_confirm" t-esc="props.confirmLabel"/>
        <button t-if="props.cancel" class="btn btn-secondary" t-on-click="_cancel" t-esc="props.cancelLabel"/>
      </t>
    </Dialog>`;
}

let customDialogTest = (title, body) => {
    let module = OdooOwl.getOwlComponent("@web/core/confirmation_dialog/confirmation_dialog");
    let alertDialog = module.AlertDialog;
    alertDialog.template = null;
    alertDialog.template = generateXmlTemplateRender();
    return {
        class: alertDialog,
        props: {
            title: title,
            body: body
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
    customDialogTest: customDialogTest
}