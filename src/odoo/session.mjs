export async function isOdooSession (window) {
    let url = await chrome.tabs.query({'active': true, 'lastFocusedWindow': true}).then(
        (tabs) => {
            return tabs[0].url;
        }
    );
    if(url){
        // Got url: Check for odoo
        return true;
    }
    else{
        return false;
    }
}