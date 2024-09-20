import * as https from "N/https";

export interface ConnectionStatusMessage {
    showInProgressMessage: () => void;
    processResponse: (response: Promise<https.ClientResponse>) => void;
}