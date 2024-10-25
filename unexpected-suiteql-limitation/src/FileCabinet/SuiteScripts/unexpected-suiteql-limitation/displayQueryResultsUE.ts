/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */

import {EntryPoints} from "N/types";
import {Form} from "N/ui/serverWidget";

import * as query from "N/query";
import * as search from "N/search";
import * as message from "N/ui/message";

export const beforeLoad = (context: EntryPoints.UserEvent.beforeLoadContext) => {
    const {form} = context;

    showSuiteQlOnDocumentField(form);
    showSearchOnDocumentField(form);
};

const showSuiteQlOnDocumentField = (form: Form) => {
    const queryString = `SELECT custrecord_asp_rec_doc_field from customrecord_asp_rec_with_doc_field`;
    let bannerMessage = "";
    try {
        const queryResults = query.runSuiteQL({
            query: queryString
        }).asMappedResults();

        bannerMessage = `Query: ${queryString} <br/> Reults: ${JSON.stringify(queryResults)}`;
    } catch(error) {
        bannerMessage = `Query: ${queryString} <br/> Error: ${error.toString()}`;
    }

    form.addPageInitMessage({
        title: "SuiteQL Query Demo",
        message: bannerMessage,
        type: message.Type.INFORMATION
    });
}

const showSearchOnDocumentField = (form: Form) => {
    const searchObject = search.create({
        type: "customrecord_asp_rec_with_doc_field",
        columns: ["custrecord_asp_rec_doc_field"]
    });

    const searchResults = [];
    searchObject.run().each(result => {
        searchResults.push(result);
        return true;
    });


    form.addPageInitMessage({
        title: "Search Demo",
        message: `Results: ${JSON.stringify(searchResults)}`,
        type: message.Type.INFORMATION
    });
}