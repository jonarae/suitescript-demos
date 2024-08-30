/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

define([
    "exports"
], (exports) => {
    exports.beforeLoad = (context) => {
        const {newRecord, form} = context;

        form.clientScriptModulePath = "./syncMessagesCL.js";
        form.addButton({
            id: "custpage_sync_messages",
            label: "Sync Messages",
            functionName: `syncMessages(${newRecord.id})`
        });
    };
});