/*
    Templates for notebook tab inspector

 */


let generateBodyTemplate_V15 = () => {
    return `
        <t t-name="web.ConfirmationDialogBody" owl="1">
        <div class="o_horizontal_separator mt-4 mb-3 text-uppercase fw-bolder small">Details</div>    
        </t>
    `;
}





export const NotebookTabInspectorTemplates = {
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