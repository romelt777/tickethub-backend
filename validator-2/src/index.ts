import "dotenv/config";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import AWSXRAY from "aws-xray-sdk";
import { validateTicket } from "./validate-ticket.js";
//for event type 
import type { APIGatewayProxyResult } from "aws-lambda";


//using awsXray
//wrapping client for tracing
//when sending an sqs message, will tell Xray.

type EventType = {
    body: string,
};

const sqsClient = AWSXRAY.captureAWSv3Client(new SQSClient({ region: process.env.AWS_REGION_LOCAL || "us-east-1" }));

export const handler = async (event: EventType): Promise<APIGatewayProxyResult> => {
    try {
        //request
        let body;

        try {
            if (event.body != null) {
                body = JSON.parse(event.body);
            }
        } catch {
            return {
                statusCode: 400,
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ error: "Invalid JSON body" }),
            };
        }

        //validate ticket
        const errors = validateTicket(body);

        //return error if errors exist
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
        console.error("Error:", error);
        throw error; //this will cause lambda failure, and therefore set off cloudwatch alarm email notification
    }
}
