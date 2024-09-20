import * as dialog from "N/ui/dialog";
import * as https from "N/https";
import {ConnectionStatusMessage} from "customized-messages/types";

export class ConnectionStatusViaDialog implements ConnectionStatusMessage {
    #showStatusMessage = false;

    showInProgressMessage(): Promise<string> {
        return dialog.create({
            buttons: [
                {label: "Wait for Connection Status", value: 1},
                {label: "Close Connection", value: 0}
            ],
            title: "Checking Connection Status",
            message: "We are currently checking the connection status. " +
                "Please wait a moment. If this message persists, contact support for assistance."
        });
    }

    processResponse(response: Promise<https.ClientResponse>): void {
        setTimeout(() => {
            console.log("Simulating API request delay...");
            response
                .then(() => {
                    this.#showSuccessfulConnectionBanner();
                })
                .catch(() => {
                    this.#showFailedConnectionBanner();
                });
        }, 3000);
    }

    #showSuccessfulConnectionBanner(): void {
        dialog.alert({
            title: "Connection Successful",
            message: "The connection to the server was successful. You can now continue with your tasks."
        });
    }
    
    #showFailedConnectionBanner(): void {
        dialog.alert({
            title: "Connection Failed",
            message: "We were unable to connect to the server. " +
                "Please try again. If the problem persists, contact support."
        });
    };
}