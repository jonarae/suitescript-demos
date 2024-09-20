import * as message from "N/ui/message";
import * as https from "N/https";
import {ConnectionStatusMessage} from "customized-messages/types";

export class ConnectionStatusViaBanner implements ConnectionStatusMessage {
    #inProgressBanner: message.Message;

    showInProgressMessage(): void {
        this.#inProgressBanner = message.create({
            title: "Checking Connection Status",
            message: "We are currently checking the connection status. " +
                "Please wait a moment. If this message persists, contact support for assistance.",
            type: message.Type.INFORMATION
        });
        this.#inProgressBanner.show();
    }

    processResponse(response: Promise<https.ClientResponse>): void {
        setTimeout(() => {
            console.log("Simulating API request delay...");

            response
            .then(() => {
                this.#inProgressBanner.hide();
                this.#showSuccessfulConnectionBanner();
            })
            .catch(() => {
                this.#inProgressBanner.hide();
                this.#showFailedConnectionBanner();
            });
        }, 3000);
    }

    #showSuccessfulConnectionBanner(): void {
        const successfulConnectionBanner = message.create({
            title: "Connection Successful",
            message: "The connection to the server was successful. You can now continue with your tasks.",
            type: message.Type.CONFIRMATION
        });
    
        successfulConnectionBanner.show();
    }
    
    #showFailedConnectionBanner(): void {
        const failedConnectionBanner = message.create({
            title: "Connection Failed",
            message: "We were unable to connect to the server. " +
                "Please try again. If the problem persists, contact support.",
            type: message.Type.ERROR
        });
    
        failedConnectionBanner.show();
    };
}
