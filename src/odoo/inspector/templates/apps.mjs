/*
    Templates for app inspector dialogs
 */

let generateBodyTemplate_V15 = () => {
    return `
        <t t-name="web.ConfirmationDialogBody" owl="1">
            <t t-esc="props.body" />
        </t>
    `;
}

let generateFooterTemplate_V15 = () => {
    return `
        <t t-name="web.ConfirmationDialogFooter" owl="1">
            <button class="btn btn-primary" t-on-click="_confirm">
                Ok
            </button>
            <button t-if="props.cancel" class="btn btn-secondary" t-on-click="_cancel">
                Cancel
            </button>
        </t>
    `;
}

let generateTemplate_V16 = () => {
    return `
    <Dialog size="'sm'" title="props.title" contentClass="props.contentClass">
       <div>Odoo hacked!</div>
        <p t-out="props.body" class="text-prewrap"/>
        <t t-set-slot="footer">
        <button class="btn" t-att-class="props.confirmClass" t-on-click="_confirm" t-esc="props.confirmLabel"/>
        <button t-if="props.cancel" class="btn btn-secondary" t-on-click="_cancel" t-esc="props.cancelLabel"/>
      </t>
    </Dialog>`;
}




export const AppInspectorTemplates = {
    15: {
        dialog: {
            bodyTemplate: generateBodyTemplate_V15,
            footerTemplate: generateFooterTemplate_V15
        }
    },
    16: {
        dialog: {
            template: generateTemplate_V16
        }
    }
}