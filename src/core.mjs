import {createFloatingDebugButton} from "./controls/floating_debug_button.mjs";

export function run(){
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(
        createFloatingDebugButton(
            document
        )
    );
}