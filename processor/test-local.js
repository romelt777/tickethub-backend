require('dotenv').config();

//importing handler function from .index
const { handler } = require('./index');

//mock SQS event
const mockEvent = {
    Records: [
        {
            body: JSON.stringify({
                "id": 333,
                "email": "user@example.com",
                "name": "TESTING FROM LOCAL AWS PROCESSOR",
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
        }
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
