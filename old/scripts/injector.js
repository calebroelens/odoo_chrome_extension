
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

let build_odoo_debug_bar = () => {
    return `
    <style>
    .odoo_debug_bar_content {
        display: flex;
        flex-wrap: wrap;
        font-family: var(--body-font-family);
    }
    </style>
    <div class="odoo_debug_bar_content h-100 w-100 p-1">
        <a class="btn btn-primary h-75" style="margin-top: auto; margin-bottom: auto;" href="/web/database/manager">Databases</a>
        <div id="hover_detail" style="margin-top: auto;margin-bottom:auto;margin-left:16px;" class="h-75 fw-bold p-1"></div>
    </div>
`;
}

waitForElm("body").then((body) => {
    let newNode = document.createElement('div');
    newNode.className = "odoo_debug_bar";
    newNode.setAttribute("style", "height: 5vh !important;border-bottom: 1px solid #C9CCD2;box-shadow: 0 5px 20px -15px rgba(0, 0, 0, 0.4);");
    newNode.innerHTML = build_odoo_debug_bar();
    body.parentNode.insertBefore(newNode, body);
})

waitForElm("div .o_field_one2many").then((_) => {
    let one2many = document.querySelectorAll('div.o_field_one2many');
    for(let element of one2many){
        element.addEventListener("mouseover", function(e){
            document.getElementById("hover_detail").innerHTML = `<p>One2Many: Name: ${e.target.getAttribute("name")}</p>`;
        });
    }
});

waitForElm('a.nav-link[role="tab"][tabindex]').then((elements) => {
    let tabs = document.querySelectorAll('a.nav-link[role="tab"][tabindex]');
    for (let element of tabs) {
        element.addEventListener("click", function(e) {
            document.getElementById("hover_detail").innerHTML = `<p>Page: Name: ${e.target.getAttribute("name")}</p>`;
        })
    }
})
