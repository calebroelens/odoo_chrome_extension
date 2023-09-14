import {OdooRpc} from "../services/rpc.js";
import {OdooNotification} from "../services/notification.mjs";
import {RecordInspectorTemplates} from "./templates/record_inspector_templates.mjs";
import {OdooVersion} from "../version.mjs";
import {OdooDialog} from "../services/dialog.mjs";


let renderFormInspector = (record_data) => {
    let templates = RecordInspectorTemplates[OdooVersion.getOdooVersion()[0]]["dialog"];
    let renderDialog = OdooDialog.renderCustomDialog(
        "Inspect: Form Record",
        "",
        {
            data: {fields: record_data}
        },
        templates
    )
    OdooDialog.showDialog(renderDialog.class, renderDialog.props);
}

let convertRecord = (record) => {
    /* Utility method to make converting to a xml template easier */
    let final_record = [];
    for(let key of Object.keys(record)){
        let key_data = record[key];
        if(Array.isArray(key_data)){
            if(key_data.length === 0){
                // Empty field
                final_record.push(
                    {
                        key: key,
                        value: null,
                        id: null,
                        multi: false
                    }
                )
            } else if(key_data.length === 2) {
                if(typeof key_data[2] === 'string'){
                    // Many 2 One
                    final_record.push(
                        {
                            key: key,
                            value: key_data[1],
                            id: key_data[0],
                            multi: false
                        }
                    )
                } else {
                    // One2Many or Many2Many
                    final_record.push({
                        key: key,
                        value: key_data,
                        id: key_data,
                        multi: true
                    })
                }

            }
        } else {
            final_record.push({
                key: key,
                value: key_data,
                id: false,
                multi: false
            });
        }
    }
    return final_record;
}

let getLocationParams = () => {
    let hash = window.location.hash.substring(1);
    return hash.split("&").reduce((res, item) => {
       let parts = item.split('=');
       res[parts[0]] = parts[1];
       return res;
    }, {});
}

let getRecordFormData = async () => {
    /* Get the record from the current location */
    let location_params = getLocationParams();
    if(
        location_params.model
        && location_params.id
        && location_params.view_type
        && location_params.view_type === 'form'
    ){
        let callRpcResult = await OdooRpc.callRpc(
            `/web/dataset/call_kw/${location_params.model}/web_read`,
            {
                model: location_params.model,
                method: 'read',
                args: [parseInt(location_params.id)],
                kwargs: {}
            }
        )
        if(callRpcResult.length === 1){
            return {
                record: callRpcResult[0]
            };
        }
    }
    else {
        return {
            record: null
        };
    }
    return {record: null};
}

let inspectRecord = async () => {
    let params = getLocationParams();
    if(params.view_type && params.view_type === 'form'){
        let record_data = await getRecordFormData();
        if (record_data.record !== null){
            OdooNotification.showNotification(`Rendering ${Object.keys(record_data.record).length} fields Please wait.`, {'type': 'success'});
            let convert = convertRecord(record_data.record);
            // Call Render
            renderFormInspector(convert);
        }
        else {
            OdooNotification.showNotification("Failed to read form data =(", {'type': 'danger'});
        }
    } else {
        OdooNotification.showNotification("Can only read form records for now :(", {'type': 'danger'})
    }
}

export const RecordInspector = {
    inspectRecord: inspectRecord
}