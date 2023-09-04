import {createFloatingDebugButton} from "./controls/floating_debug_button.mjs";
import {isOdooSession} from "./odoo/session.mjs";

export function run(){
    if(isOdooSession(window)){
        let body = document.getElementsByTagName("body")[0];
        body.appendChild(
            createFloatingDebugButton(
                document
            )
        );
    }
    console.log(window.odoo);
}