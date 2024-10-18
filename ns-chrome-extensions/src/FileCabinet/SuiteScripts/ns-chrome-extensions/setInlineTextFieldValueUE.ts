/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

import {EntryPoints} from "N/types";

export const beforeSubmit: EntryPoints.UserEvent.beforeSubmit = (scriptContext) => {
    const {newRecord} = scriptContext;

    const INLINE_TEXT_FIELD_ID = "custrecord_asp_chrome_extension_inline";
    const hasInlineTextValue = !!newRecord.getValue({
        fieldId: INLINE_TEXT_FIELD_ID
    });

    if(!hasInlineTextValue) {
        newRecord.setValue({
            fieldId: INLINE_TEXT_FIELD_ID,
            value: "Guess which script set this value!"
        });
    }
}