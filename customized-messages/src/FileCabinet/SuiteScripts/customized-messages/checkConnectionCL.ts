/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

import * as https from "N/https";
import * as url from "N/url";

import {ConnectionStatusViaBanner} from "./connectionStatusViaBanner";
import {ConnectionStatusViaDialog} from "./connectionStatusViaDialog";

export const checkConnection = (useBannerForMessage: boolean): void => {
    const response = https.get.promise({
        url: getCheckConnectionUrl()
    });

    if(useBannerForMessage) {
        const connectionStatusViaBanner = new ConnectionStatusViaBanner();
        connectionStatusViaBanner.showInProgressMessage();
        connectionStatusViaBanner.processResponse(response);
        return;
    }

    const connectionStatusViaDialog = new ConnectionStatusViaDialog();
    connectionStatusViaDialog.showInProgressMessage()
        .then(result => {
            const waitForConnectionStatus = !!result;
            if(!waitForConnectionStatus) {
                return;
            }

            connectionStatusViaDialog.processResponse(response);
        });
};

const getCheckConnectionUrl = (): string => {
    const CheckConnection = {
        SCRIPT: "customscript_asp_check_connection_rl",
        DEPLOYMENT: "customdeploy_asp_check_connection_rl"
    };

    return url.resolveScript({
        scriptId: CheckConnection.SCRIPT,
        deploymentId: CheckConnection.DEPLOYMENT
    });
};


export const pageInit = () => {};