import "dotenv/config";
import AWSXRay from "aws-xray-sdk";
//environment variables are not auto set

//nned to ignore xray, because test is local only, not running from aws lambda
AWSXRay.setContextMissingStrategy("IGNORE_ERROR");

import { handler } from "../src/index"

const testEvent = {
    body: JSON.stringify({
        id: 222,
        email: "user@example.com",
        name: "BOB",
        phone: "5091118186",
        quantity: 333,
        creditCard: "4242424242424242",
        expirationDate: "09/67",
        securityCode: "511",
        address: "strING",
        city: "sOUTH CITY",
        province: "string",
        postalCode: "90210",
        country: "SANADA"
    })
};

handler(testEvent).then(response => {
    console.log('Response:', response);
});