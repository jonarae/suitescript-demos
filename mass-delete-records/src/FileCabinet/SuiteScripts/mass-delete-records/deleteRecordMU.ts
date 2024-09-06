/**
 * @NApiVersion 2.1
 * @NScriptType MassUpdateScript
 * @NModuleScope SameAccount
 */

import {EntryPoints} from "N/types";

import * as record from "N/record";

export const each: EntryPoints.MassUpdate.each = (({type, id}) => {
    record.delete({
        type,
        id
    });
});