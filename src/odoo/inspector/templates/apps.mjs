/*
    Templates for app inspector dialogs
 */

let generateBodyTemplate_V15 = () => {
    return `
        <t t-name="web.ConfirmationDialogBody" owl="1">
        <!--            <t t-esc="props.body" />-->
        <div class="o_horizontal_separator mt-4 mb-3 text-uppercase fw-bolder small">Details</div>
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
                        <span>Xml Id</span>
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
                <tr class="o_data_row o_list_no_open">
                    <td class="o_data_cell o_field_cell">
                        <span>App Icon</span>
                    </td>
                    <td class="o_data_cell o_field_cell">
                        <img t-attf-src="{{props.odoo_record.webIconData}}" alt="App icon"/>
                    </td>
                </tr>
                <tr class="o_data_row o_list_no_open">
                    <td class="o_data_cell o_field_cell">
                        <span>Children</span>
                    </td>
                    <td class="o_data_cell o_field_cell">
                        <ul>
                            <t t-foreach="props.odoo_record.childrenTree" t-as="menu" t-key="id">
                                <li><span t-esc="menu.name"></span>: <span t-esc="menu.xmlid"></span></li>
                            </t>
                        </ul>
                    </td>
                </tr>
            </tbody>        
        </table>
        <div class="o_horizontal_separator mt-4 mb-3 text-uppercase fw-bolder small">Actions</div>
            <table class="o_list_table table table-sm table-hover table-striped" style="table-layout: fixed;">
                <thead>
                    <tr>
                        <th>Action</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="o_data_row o_list_no_open">
                        <td class="o_data_cell o_field_cell">
                            <span>Click everywhere</span>
                        </td>
                        <td class="o_data_cell o_field_cell">
                            <button class="btn btn-primary" t-attf-onclick="document.dispatchEvent(new CustomEvent('odoo_debug_click_everywhere_xmlid',{detail: '{{props.data.xml_id}}' }));">Start test</button>
                        </td>
                    </tr>
                </tbody>        
            </table>
        </t>
    `;
}

let generateFooterTemplate_V15 = () => {
    return `
        <t t-name="web.ConfirmationDialogFooter" owl="1">
            <!--            <button class="btn btn-primary" t-on-click="_confirm">-->
            <!--                Ok-->
            <!--            </button>-->
            <button t-if="props.cancel" class="btn btn-primary" t-on-click="_cancel">
                Ok
            </button>
        </t>
    `;
}

let generateTemplate_V16 = () => {
    return `
    <Dialog size="xl" title="props.title" contentClass="props.contentClass">
        <!-- <p t-out="props.body" class="text-prewrap"/> -->
        <div class="o_horizontal_separator mt-4 mb-3 text-uppercase fw-bolder small">Details</div>
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
                        <span>Xml Id</span>
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
                <tr class="o_data_row o_list_no_open">
                    <td class="o_data_cell o_field_cell">
                        <span>App Icon</span>
                    </td>
                    <td class="o_data_cell o_field_cell">
                        <img t-attf-src="{{props.odoo_record.webIconData}}" alt="App icon"/>
                    </td>
                </tr>
                <tr class="o_data_row o_list_no_open">
                    <td class="o_data_cell o_field_cell">
                        <span>Children</span>
                    </td>
                    <td class="o_data_cell o_field_cell">
                        <ul>
                            <t t-foreach="props.odoo_record.childrenTree" t-as="menu" t-key="id">
                                <li><span t-esc="menu.name"></span>: <span t-esc="menu.xmlid"></span></li>
                            </t>
                        </ul>
                    </td>
                </tr>
            </tbody>        
        </table>
        <div class="o_horizontal_separator mt-4 mb-3 text-uppercase fw-bolder small">Actions</div>
        <table class="o_list_table table table-sm table-hover table-striped" style="table-layout: fixed;">
            <thead>
                <tr>
                    <th>Action</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr class="o_data_row o_list_no_open">
                    <td class="o_data_cell o_field_cell">
                        <span>Click everywhere</span>
                    </td>
                    <td class="o_data_cell o_field_cell">
                        <button class="btn btn-primary" t-attf-onclick="document.dispatchEvent(new CustomEvent('odoo_debug_click_everywhere_xmlid',{detail: '{{props.data.xml_id}}' }));">Start test</button>
                    </td>
                </tr>
            </tbody>        
        </table>
        <t t-set-slot="footer">
        <button class="btn btn-primary" t-att-class="props.confirmClass" t-on-click="_confirm" t-esc="props.confirmLabel"/>
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
    },
    'saas~16': {
        dialog: {
            template: generateTemplate_V16
        }
    }
}