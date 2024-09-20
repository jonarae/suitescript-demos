/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

import {EntryPoints} from "N/types";

import * as runtime from "N/runtime";

export const beforeLoad: EntryPoints.UserEvent.beforeLoad = (scriptContext) => {
    const {form} = scriptContext;

    const currentScript = runtime.getCurrentScript();
    const useBannerForMessage = currentScript.getParameter({
        name: "custscript_use_banner"
    });

    form.clientScriptModulePath = "./checkConnectionCL";
    form.addButton({
        id: "custpage_check_connection",
        label: "Check Connection",
        functionName: `checkConnection(${useBannerForMessage})`
    });
};