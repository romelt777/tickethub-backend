import "dotenv/config";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import AWSXRAY from "aws-xray-sdk";
import { error } from "node:console";

//using awsXray
//wrapping client for tracing
//when sending an sqs message, will tell Xray.

const sqsClient = AWSXRAY.captureAWSv3Client(new SQSClient({ region: process.env.AWS_REGION_LOCAL || "us-east-1" }));

exports.handler = async (event) => {
    try {
        //request
        let body;

        try {
            body = JSON.parse(event.body);
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


    } catch (error) {
        console.error("Error:", error);
        throw error; //this will cause lambda failure, and therefore set off cloudwatch alarm email notification
    }
}
