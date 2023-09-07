import {OdooServices} from "../services.mjs";

let showNotification = (message, options=  {}) => {
    if(window.RUN_MODE === "FULL"){
        const notificationService = OdooServices.getOdooWOWL_service("notification");
        if(notificationService){
            notificationService.add(message, options)
        }
        else{
            console.error("Could not reach notification service!");
        }
    }
    else {
        // Cannot display a native notification! -> Inject a bootstrap notification
        // TODO
    }
}

export const OdooNotification =  {
    showNotification: showNotification
};