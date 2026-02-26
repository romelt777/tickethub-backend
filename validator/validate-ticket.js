const validator = require('validator');

function validateTicket(ticket) {
    const errors = [];

    // ID validation
    if (!ticket.id) {
        errors.push({ "id": "TicketId is required" });
    }

    //email
    if (!ticket.email || ticket.email.trim() === '') {
        errors.push({ "email": "Email is required" });
    } else if (!validator.isEmail(ticket.email)) {
        errors.push({ "email": "Invalid Email Address - Format: user@example.com" });
    }

    //name 
    if (!ticket.name || ticket.name.trim() === '') {
        errors.push({ "name": 'Name is required' });
    } else if (ticket.name.length > 30) {
        errors.push({ "name": 'Invalid Name: Maximum 30 Characters' });
    } else if (ticket.name.length < 2) {
        errors.push({ "name": 'Invalid Name: Minimum 2 Characters' });
    }

    //phone 
    if (!ticket.phone || ticket.phone.trim() === '') {
        errors.push({ "phone": 'Phone number is required' });
    } else if (!validator.isMobilePhone(ticket.phone)) { //possible to add locals
        errors.push({ "phone": "Invalid Phone Number" })
    }

    //quantity
    if (!ticket.quantity) {
        errors.push({ "quantity": 'Quantity is required' });
    } else if (ticket.quantity < 1) {
        errors.push({ "quantity": 'Invalid Quantity: must be at least 1' });
    }

    //credit card
    if (!ticket.creditCard || ticket.creditCard.trim() === '') {
        errors.push({ "creditCard": 'Credit Card is required' });
    } else if (!validator.isCreditCard(ticket.creditCard)) {
        errors.push({ "creditCard": 'Invalid Credit Card Number - Format: 1234 5678 9876 5432' });
    }

    //expiration date
    // const expire = "^(0[1-9]|1[0-2])\/([0-9]{4}|[0-9]{2})$";
    if (!ticket.expirationDate || ticket.expirationDate.trim() === '') {
        errors.push({ "expirationDate": 'Expiration date is required' });
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2}|[0-9]{4})$/.test(ticket.expirationDate)) {
        errors.push({ "expirationDate": 'Invalid Expiration Date - Format: MM/YY or MM/YYYY' });
    }

    //security code
    if (!ticket.securityCode || ticket.securityCode.trim() === '') {
        errors.push({ "securityCode": 'Security code is required' });
    } else if (!/^[0-9]{3,4}$/.test(ticket.securityCode)) {
        errors.push({ "securityCode": 'Invalid Security Code - Format: 3 or 4 digits' });
    }

    //address
    if (!ticket.address || ticket.address.trim() === '') {
        errors.push({ "address": 'Address is required' });
    } else if (ticket.address.length > 50) {
        errors.push({ "address": 'Invalid Address: Maximum 50 Characters' });
    } else if (ticket.address.length < 5) {
        errors.push({ "address": 'Invalid Address: Minimum 5 Characters' });
    }

    //city
    if (!ticket.city || ticket.city.trim() === '') {
        errors.push({ "city": 'City is required' });
    } else if (ticket.city.length > 25) {
        errors.push({ "city": 'Invalid City: Maximum 25 Characters' });
    } else if (ticket.city.length < 2) {
        errors.push({ "city": 'Invalid City: Minimum 2 Characters' });
    }

    //province
    if (!ticket.province || ticket.province.trim() === '') {
        errors.push({ "province": 'Province is required' });
    } else if (ticket.province.length > 25) {
        errors.push({ "province": 'Invalid Province: Maximum 25 Characters' });
    }

    //postal code
    if (!ticket.postalCode || ticket.postalCode.trim() === '') {
        errors.push({ "postalCode": 'Postal Code  is required' });
    } else if (!validator.isPostalCode(ticket.postalCode, 'any')) {
        errors.push({ "postalCode": 'Invalid Postal Code' });
    }


    //country
    if (!ticket.country || ticket.country.trim() === '') {
        errors.push({ "country": 'Country is required' });
    } else if (ticket.country.length > 25) {
        errors.push({ "country": 'Invalid Country: Maximum 25 Characters' });
    } else if (ticket.country.length < 2) {
        errors.push({ "country": 'Invalid Country: Minimum 2 Characters' });
    }

    return errors;
}

// Export so  files can use it
module.exports = { validateTicket };