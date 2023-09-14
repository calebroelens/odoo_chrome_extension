
chrome.commands.onCommand.addListener((command) => {
   chrome.tabs.query({'active': true, currentWindow: true}, (tabs) => {
       chrome.tabs.sendMessage(tabs[0].id, {"action": "toggle_debug"});
   })
});



chrome.contextMenus.onClicked.addListener((clickData, tab) => {
    chrome.tabs.query({'active': true, currentWindow: true}, (tabs) => {
        if(clickData.menuItemId === 'odoo_inspect'){
            chrome.tabs.sendMessage(tabs[0].id, {"action": "context_menu_click", "clickData": clickData});
        }
        else if(clickData.menuItemId === "odoo_inspect_record") {
            chrome.tabs.sendMessage(tabs[0].id, {"action": "context_menu_click_inspect_record", "clickData": clickData});
        }

    });
});

let odoo_debug_contextMenuId = null;
let odoo_debug_form_contextMenuId = null;

chrome.runtime.onSuspend.addListener((ev) => {
        chrome.tabs.query({'active': true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {"action": "suspend"});
        });
    }
)
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {

    if(msg.request === "show_context_menu"){
        if(!odoo_debug_contextMenuId){
            chrome.contextMenus.create({
                'title': 'Odoo Inspect Element',
                'contexts': ['all'],
                'id': 'odoo_inspect'
            });
            odoo_debug_contextMenuId = "odoo_inspect";
        }
    }
    else if(msg.request === "remove_context_menu"){
        if(odoo_debug_contextMenuId){
            chrome.contextMenus.remove(odoo_debug_contextMenuId);
            odoo_debug_contextMenuId = null;
        }
    }
    if(msg.request === "show_context_menu_record"){
        if(!odoo_debug_form_contextMenuId){
            chrome.contextMenus.create({
                'title': 'Odoo View Record',
                'contexts': ['all'],
                'id': 'odoo_inspect_record'
            });
            odoo_debug_form_contextMenuId = "odoo_inspect_record";
        }
    }
    else if(msg.request === "remove_context_menu_form"){
        if(odoo_debug_form_contextMenuId){
            chrome.contextMenus.remove(odoo_debug_form_contextMenuId);
            odoo_debug_form_contextMenuId = null;
        }
    }
});