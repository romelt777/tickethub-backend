import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import * as AWSXRay from "aws-xray-sdk";
import { SQSEvent } from "aws-lambda";


//using aws xRay
//wrapping client for tracing
//when written to DB will make call to XRay with timing and info

//creating connection to dynamoDB
const client = AWSXRay.captureAWSv3Client(new DynamoDBClient({ region: process.env.AWS_REGION_LOCAL || "us-east-1" }));

//document client is AWS ORM
const docClient = DynamoDBDocumentClient.from(client);


//event: is the data from AWS SQS
export const handler = async (event: SQSEvent): Promise<void> => {
    console.log("Received SQS event");

    try {
        //sqs sends messages in batches (1 or many)
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
            console.log("Ticket Saved:", ticket.ticketId);
        }

    } catch (error) {
        console.error("Error Porcessing Tickets:", error);
        throw error; //sqs will retry 
    }
}