import {OdooDetection} from "./odoo/detect.mjs";

let RUN_MODE = "disabled";

console.log("[OED] Injector loading");


(() => {
    /* Always run code */
    if(OdooDetection.isOdooAvailable() && OdooDetection.isOdooLoggedIn()){
        RUN_MODE = "full";
    } else if(OdooDetection.isOdooAvailable() && !OdooDetection.isOdooLoggedIn()){
        RUN_MODE = "website"
    } else {
        RUN_MODE = "disabled"
    }
    console.log(`[OED] Run mode: ${RUN_MODE}`);
})();

console.log("[OED] Injector load complete");