/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */

import * as testData from "./testData";
import * as record from "N/record";
import * as message from "N/ui/message";

export const syncMessages = (customerId: number): void => {
    // send API call to external application
    const mockResponseMessages = testData.messages;
    console.log("mockResponseMessages", mockResponseMessages);

    const customerRecord = record.load({
        type: record.Type.CUSTOMER,
        id: customerId
    });

    const sublistId = "recmachcustrecord_asp_message_customer"
    mockResponseMessages.forEach(message => {
        const line = customerRecord.getLineCount({
            sublistId
        });
        
        customerRecord.insertLine({
            sublistId,
            line
        });

        const fieldValueMapping = {
            custrecord_asp_message_from: message.from,
            custrecord_asp_message_to: message.to,
            custrecord_asp_message_title: message.title,
            custrecord_asp_message_content: message.content,
            custrecord_asp_message_date_received: message.date_received
        };

        for(let fieldId in fieldValueMapping) {
            customerRecord.setSublistValue({
                sublistId,
                line,
                fieldId,
                value: fieldValueMapping[fieldId]
            });
        }
    });

    customerRecord.save();
    console.log("Saving of customer messages completed!");

    message.create({
        type: message.Type.CONFIRMATION,
        title: "Completed",
        message: "Syncing of customer messages completed! Refresh the page to see synced messages."
    }).show();
};

export const pageInit = () => {};