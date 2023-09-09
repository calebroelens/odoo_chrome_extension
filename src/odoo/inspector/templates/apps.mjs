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
    <Dialog size="xl" title="props.title" contentClass="props.contentClass">
        <!-- <p t-out="props.body" class="text-prewrap"/> -->
        <table class="o_list_table table table-sm table-hover table-striped" style="table-layout: fixed;">
            <thead>
                <tr>
                    <th>Key</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
            <tr class="o_data_row o_list_no_open">
                    <td class="o_data_cell o_field_cell">
                        <span>Name</span>
                    </td>
                    <td class="o_data_cell o_field_cell">
                        <span t-esc="props.data.name"></span>
                    </td>
                </tr>
                <tr class="o_data_row o_list_no_open">
                    <td class="o_data_cell o_field_cell">
                        <span>menu_xml_id</span>
                    </td>
                    <td class="o_data_cell o_field_cell">
                        <span t-esc="props.data.xml_id"></span>
                    </td>
                </tr>
                <tr class="o_data_row o_list_no_open">
                    <td class="o_data_cell o_field_cell">
                        <span>Link</span>
                    </td>
                    <td class="o_data_cell o_field_cell">
                        <a t-attf-href="{{props.data.href}}"><p t-esc="props.data.href"></p></a>
                    </td>
                </tr>
            </tbody>        
        </table>
        <t t-set-slot="footer">
        <button class="btn btn-primary" t-att-class="props.confirmClass" t-on-click="_confirm" t-esc="props.confirmLabel"/>
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