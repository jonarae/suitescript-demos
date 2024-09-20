/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 * @NModuleScope SameAccount
 */

import {EntryPoints} from "N/types";

import * as runtime from "N/runtime";

export const get: EntryPoints.RESTlet.get = () => {
    const currentScript = runtime.getCurrentScript();
    const simulateFailedConnection = currentScript.getParameter({
        name: "custscript_simulate_failed_connection"
    });

    if(simulateFailedConnection) {
        throw new Error();
    }
    
    return "success";
};