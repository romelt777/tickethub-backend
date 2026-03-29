import validator from "validator";

type ticketType = {
    id: string,
    email: string,
    name: string,
    phone: string,
    quantity: string,
    creditCard: string,
    expirationDate: string,
    securityCode: string,
    address: string,
    city: string,
    province: string,
    postalCode: string,
    country: string,
}

function validateTicket(ticket: ticketType) {
    let errors: string[];



}

module.exports = { validateTicket };