export function createFloatingDebugButton(document){
    let button = document.createElement("a");
    button.href = "#";
    button.className = "debug_float";
    button.innerHTML = "<i class='my_debug_float fa fa-bug fa-2x'></i>"
    return button;
}