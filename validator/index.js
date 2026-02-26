require('dotenv').config();
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs");
const { validateTicket } = require("./validate-ticket.js");


const sqsClient = new SQSClient({ region: process.env.AWS_REGION_LOCAL || 'us-east-1' });

exports.handler = async (event) => {
    try {
        //parse request
        const body = JSON.parse(event.body);

        //validate ticket
        const errors = validateTicket(body);

        if (errors.length > 0) {
            return {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ errors })
            };
        }

        //send to sqs
        const command = new SendMessageCommand({
            QueueUrl: process.env.QUEUE_URL,
            MessageBody: JSON.stringify(body)
        });


        await sqsClient.send(command);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                message: 'Ticket queued successfully',
                ticketId: body.ticketId || Date.now()
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};