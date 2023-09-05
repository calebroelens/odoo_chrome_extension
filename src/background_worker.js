chrome.commands.onCommand.addListener((command) => {
   chrome.tabs.query({'active': true, currentWindow: true}, (tabs) => {
       chrome.tabs.sendMessage(tabs[0].id, {"action": "toggle_debug"});
   })
});
