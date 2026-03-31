import "dotenv/config";
//importing handler function from .index
import { handler } from '../src/index';
import type { SQSEvent, SQSRecord } from "aws-lambda";
import * as AWSXRay from "aws-xray-sdk";



AWSXRay.setContextMissingStrategy("IGNORE_ERROR");


//mock SQS event
const mockEvent: SQSEvent = {
    Records: [
        {
            body: JSON.stringify({
                "id": 333,
                "email": "user@example.com",
                "name": "LOCAL MARCH TEST",
                "phone": "5091118186",
                "quantity": 333,
                "creditCard": "4242424242424242",
                "expirationDate": "09/67",
                "securityCode": "511",
                "address": "string",
                "city": "string",
                "province": "string",
                "postalCode": "90210",
                "country": "string"
            })
        } as SQSRecord
    ]
};

console.log('Testing processor lambda locally...\n');

handler(mockEvent)
    .then(response => {
        console.log("Success!");
        console.log("Response:", response);
    })
    .catch(error => {
        console.error("Error:", error);
    });
