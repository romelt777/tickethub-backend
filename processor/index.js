const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, PutCommand } = require("@aws-sdk/lib-dynamodb");

//creating connection to DynamoDB
const client = new DynamoDBClient({ region: process.env.AWS_REGION_LOCAL || "us-east-1" });

//Document client is AWS ORM
const docClient = DynamoDBDocumentClient.from(client);

//event => is the data from AWS SQS
exports.handler = async (event) => {
    console.log("Received SQS event");

    try {
        //SQS sends messages in batches(1 or many)
        for (const record of event.Records) {

            //parsing body of ticket data
            const ticket = JSON.parse(record.body);

            console.log("Processing Ticket:", ticket);

            //generate ticket id if needed
            if (!ticket.ticketId) {
                ticket.ticketId = Date.now().toString();
            }

            //prepare request
            const command = new PutCommand({
                TableName: process.env.TABLE_NAME,
                Item: ticket
            });

            //send request to DynamoDB
            await docClient.send(command);
            console.log("TIcket Saved:", ticket.ticketId);
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Tickets Processed Success!' })
        };

    } catch (error) {
        console.error("Error Processing tickets:", error);
        throw error; //SQS will retry.
    }
};