/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

import {EntryPoints} from "N/types";

import * as crypto from "./crypto-js/index";
import {ENCRYPTION_KEY} from "./encryptionKey";

export const beforeSubmit: EntryPoints.UserEvent.beforeSubmit = (scriptContext) => {
    const {newRecord} = scriptContext;

    if(!newRecord) {
        return;
    }

    const API_KEY_FIELD = "custrecord_asp_api_key";
    const apiKey = newRecord.getValue({
        fieldId: API_KEY_FIELD
    });

    const encryptedApiKey = crypto.AES.encrypt(apiKey, ENCRYPTION_KEY).toString();
    newRecord.setValue({
        fieldId: API_KEY_FIELD,
        value: encryptedApiKey
    });
};