/**
 * @NApiVersion 2.1
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */

import {EntryPoints} from "N/types";

import * as https from "N/https";
import * as error from "N/error";
import * as query from "N/query";
import * as log from "N/log";
import * as serverWidget from "N/ui/serverWidget";
import * as crypto from "./crypto-js/index";
import { ENCRYPTION_KEY } from "./encryptionKey";

const SEARCH_STRING_FIELD = "custpage_search_string";

export const onRequest: EntryPoints.Suitelet.onRequest = (scriptContext) => {
    const {request, response} = scriptContext;
    const searchString = request.parameters[SEARCH_STRING_FIELD];

    let errorMessage = null
    let giphyUrl = null;
    if(request.method === https.Method.POST) {
        try {
            giphyUrl = getGiphyImageUrl(searchString);
        } catch(error) {
            const ERROR_GIF_URL = "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW8zOGhiMm12MmZkaHozdHRmbjM4NzV0ejRkMzdrMW5yb2ticWRzeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zv7iqaf7DVgjoN407s/giphy.gif";
            giphyUrl = ERROR_GIF_URL;
            errorMessage = error.message;
        }
    }
    
    const form = createForm({
        searchString,
        errorMessage,
        giphyUrl
}   );
    response.writePage(form);
};

const createForm = ({searchString, giphyUrl, errorMessage}: {
    searchString?: string;
    giphyUrl?: string;
    errorMessage?: string;
}): serverWidget.Form => {
    const form = serverWidget.createForm({
        title: "Get Giphy via Encrypted Key"
    });

    const searchStringField = form.addField({
        id: SEARCH_STRING_FIELD,
        label: "Search String",
        type: serverWidget.FieldType.TEXT,
    });

    const errorField =  form.addField({
        id: "custpage_error",
        label: "Error",
        type: serverWidget.FieldType.INLINEHTML
    });

    const giphyImageHtmlField =  form.addField({
        id: "custpage_giphy_image",
        label: "Giphy Image",
        type: serverWidget.FieldType.INLINEHTML
    });

    
    searchStringField.defaultValue = searchString;
    errorField.defaultValue = errorMessage && `<h2 style="color: red">${errorMessage}<h2>`;
    giphyImageHtmlField.defaultValue = giphyUrl && `<img src=${giphyUrl}>`;

    form.addSubmitButton({
        label: "Search"
    });

    return form;
};

const getGiphyImageUrl = (searchString: string) => {
    const GIPHY_TRANSLATE_URL = "https://api.giphy.com/v1/gifs/translate";

    const [queryResult] = query.runSuiteQL({
        query: `
            SELECT
                custrecord_asp_api_key as apikey
            FROM
                customrecord_asp_api_key
        `
    }).asMappedResults();
    
    const apiKey = crypto.AES.decrypt(queryResult.apikey, ENCRYPTION_KEY).toString(crypto.enc.Utf8);

    const giphyResponse = https.get({
        url: `${GIPHY_TRANSLATE_URL}?&api_key=${apiKey}&s=${searchString}`,
        headers: {
            "Accept": "application/json"
        }
    });
    
    const HTTP_CODE_OK = 200;
    if(giphyResponse.code !== HTTP_CODE_OK) {
        throw error.create({
            name: "Error",
            message: "Request to Giphy failed. Check your API key."
        })
    }

    const responseBody = JSON.parse(giphyResponse.body) as GiphyResponseBody;
    return responseBody.data.images.downsized.url;
}

interface GiphyResponseBody {
    data: {
        url: string;
        images: {
            downsized: {
                url: string;
            }
        }
    }
}