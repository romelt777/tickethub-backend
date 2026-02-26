require('dotenv').config();
//environment variables are not auto set

const { handler } = require('./index');

const testEvent = {
    body: JSON.stringify({
        id: 222,
        email: "user@example.com",
        name: "!",
        phone: "5091118186",
        quantity: 333,
        creditCard: "4242424242424242",
        expirationDate: "09/67",
        securityCode: "511",
        address: "str",
        city: "s",
        province: "string",
        postalCode: "90210",
        country: "s"
    })
};

handler(testEvent).then(response => {
    console.log('Response:', response);
});