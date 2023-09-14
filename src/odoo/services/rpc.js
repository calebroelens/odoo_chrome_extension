/* RPC Service */


import {OdooServices} from "../services.mjs";

let getOdooRpcService = () => {
    return OdooServices.getOdooWOWL_service("rpc");
}

let callRpc = async (route, params) => {
    let rpcService = getOdooRpcService();
    return await rpcService(route, params, {});
}

let testRpc = async () => {
    /* Test rpc method */
    // let rpcCallResponse = await callRpc(
    //     /* Read all data of a record */
    //     '/web/dataset/call_kw/product.template/web_read',
    //     {
    //         model: 'product.template',
    //         method: 'read',
    //         args: [23],
    //         kwargs: {
    //
    //         }
    //     }
    // );
}


export const OdooRpc = {
    callRpc: callRpc,
    testRpc: testRpc
}