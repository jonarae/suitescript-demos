/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

import {EntryPoints} from "N/types";

import * as translation from "N/translation";
import * as message from "N/ui/message";

export const beforeLoad = (context: EntryPoints.UserEvent.beforeLoadContext) => {
    const {form} = context;

    const TRANSLATION_COLLECTION_ID = "custcollection_asp_book_record_type";
    const TRANSLATION_KEYS = [
        "banner_title",
        "banner_message"
    ];

    const [bannerTitle, bannerMesage]: string[] = TRANSLATION_KEYS.map(key => {
        return translation.get({
            collection: TRANSLATION_COLLECTION_ID,
            key
        })();
    })

    form.addPageInitMessage({
        title: bannerTitle,
        message: bannerMesage,
        type: message.Type.INFORMATION
    });
};