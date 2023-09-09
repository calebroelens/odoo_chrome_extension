
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

let generateXmlTemplateRenderBody = () => {
    return OdooOwl.renderXmlTemplate(`
        <t t-name="web.ConfirmationDialogBody" owl="1">
            <t t-esc="props.body" />
        </t>
    `);
}

let generateXmlTemplateRenderFooter = () => {
    return OdooOwl.renderXmlTemplate(`
        <t t-name="web.ConfirmationDialogFooter" owl="1">
            <button class="btn btn-primary" t-on-click="_confirm">
                Ok
            </button>
            <button t-if="props.cancel" class="btn btn-secondary" t-on-click="_cancel">
                Cancel
            </button>
        </t>
    `);
}

let generateXmlTemplateRender = () => {
    return OdooOwl.renderXmlTemplate(`
    <Dialog size="'sm'" title="props.title" contentClass="props.contentClass">
       <div>Odoo hacked!</div>
      <p t-out="props.body" class="text-prewrap"/>
      <t t-set-slot="footer">
        <button class="btn" t-att-class="props.confirmClass" t-on-click="_confirm" t-esc="props.confirmLabel"/>
        <button t-if="props.cancel" class="btn btn-secondary" t-on-click="_cancel" t-esc="props.cancelLabel"/>
      </t>
    </Dialog>`);
}

let customDialogTest = (title, body) => {
    let module = OdooOwl.getOwlComponent("@web/core/confirmation_dialog/confirmation_dialog");
    let alertDialog = module.AlertDialog;
    if(OdooVersion.getOdooVersion()[0] === 15){
        alertDialog.bodyTemplate = generateXmlTemplateRenderBody();
        alertDialog.footerTemplate = generateXmlTemplateRenderFooter();
        return {
            class: alertDialog,
            props: {
                title: 'Test',
                body: 'Body'
            }
        }
    }
    else {
        alertDialog.template = null;
        alertDialog.template = generateXmlTemplateRender();
        console.log(alertDialog.template);
        return {
            class: alertDialog,
            props: {
                title: title,
                body: body
            }
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