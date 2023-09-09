chrome.commands.onCommand.addListener((command) => {
   chrome.tabs.query({'active': true, currentWindow: true}, (tabs) => {
       chrome.tabs.sendMessage(tabs[0].id, {"action": "toggle_debug"});
   })
});



chrome.contextMenus.onClicked.addListener((clickData, tab) => {
    chrome.tabs.query({'active': true, currentWindow: true}, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, {"action": "context_menu_click", "clickData": clickData});
    });
});

let odoo_debug_contextMenuId = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.request === "show_context_menu"){
        if(!odoo_debug_contextMenuId){
            chrome.contextMenus.create({
                'title': 'Odoo Inspect',
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
});