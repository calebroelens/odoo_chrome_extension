import {DOM} from "./dom.js";


function createInspectorBar(document){
    let inspector_bar = document.createElement("div");
    inspector_bar.className = "odoo_debug_float_inspector_bar-bar"
    // Add content
    inspector_bar.innerHTML = `
    <div class="odoo_debug_float_inspector_bar__content">
    <div class="odoo_debug_float_inspector_bar__text">
    Hover over an element and execute Ctrl+I
    </div>
    </div>
    `;
    DOM.appendBody(document, inspector_bar);
}

function removeInspectorBar(document){
    DOM.removeFromView(document, ".odoo_debug_float_inspector_bar-bar", false);
}

export const OdooInspector = {
    createInspectorBar: createInspectorBar,
    removeInspectorBar: removeInspectorBar
};