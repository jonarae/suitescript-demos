/**
 * @NApiVersion 2.1
 * @NScriptType WorkflowActionScript
 * @NModuleScope SameAccount
 */

import {EntryPoints} from "N/types";

import * as record from "N/record";

export const onAction: EntryPoints.WorkflowAction.onAction = (({newRecord}) => {
    const {type, id} = newRecord;
    record.delete({
        type,
        id
    });
});