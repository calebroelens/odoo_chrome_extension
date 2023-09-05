
let appendBody = (document, element) => {
    let body = document.getElementsByTagName("body")[0];
    body.appendChild(
        element
    );
}

let removeFromView = (document, querySelector, multi) => {
    if(multi){
        let elements = document.querySelectorAll(querySelector);
        if(elements.length > 0){
            for(let element of elements){
                elements.remove();
            }
        }
    }
    else {
        let element = document.querySelector(querySelector);
        if(element){
            element.remove();
        }
    }
}

export const DOM = {
    appendBody: appendBody,
    removeFromView: removeFromView
}