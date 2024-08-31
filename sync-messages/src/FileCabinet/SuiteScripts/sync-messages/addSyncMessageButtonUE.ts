/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

import {EntryPoints} from "N/types";

export const beforeLoad = (context: EntryPoints.UserEvent.beforeLoadContext) => {
    const {newRecord, form} = context;

    form.clientScriptModulePath = "./syncMessagesCL.js";
    form.addButton({
        id: "custpage_sync_messages",
        label: "Sync Messages",
        functionName: `syncMessages(${newRecord.id})`
    });
};