/**
 * @NApiVersion 2.1
 * @NScriptType MapReduceScript
 * @NModuleScope SameAccount
 */

import {EntryPoints} from "N/types";

import * as record from "N/record";
import * as runtime from "N/runtime";
import * as search from "N/search";

export const getInputData: EntryPoints.MapReduce.getInputData = () => {
    const currentScript = runtime.getCurrentScript();

    const RECORDS_TO_DELETE_SEARCH = "custscript_asp_records_to_delete";
    const savedSearchId = currentScript.getParameter({
        name: RECORDS_TO_DELETE_SEARCH
    }) as string;
    
    return search.load({
        id: savedSearchId
    });
};

export const map: EntryPoints.MapReduce.map = (scriptContext) => {
    const {key: id, value} = scriptContext;
    const type = JSON.parse(value).recordType;

    record.delete({
        type,
        id
    });
};