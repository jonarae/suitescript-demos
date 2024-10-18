/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

import {EntryPoints} from "N/types";

import * as message from "N/ui/message";

export const pageInit: EntryPoints.Client.pageInit = (scriptContext) => {
    message.create({
        type: message.Type.INFORMATION,
        title: "Welcome!",
        message: "Guess which script displayed this banner!"
    }).show();
}