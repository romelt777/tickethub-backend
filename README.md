# TicketHub Backend

This is the serverless backend for TicketHub.  
It handles ticket validation, asynchronous processing, and storage using AWS services.

For the full project:
- https://github.com/romelt777/tickethub

## Architecture

API Gateway → Validator Lambda → SQS → Processor Lambda → DynamoDB  
Failed messages → Dead-Letter Queue

## Tech Stack

- AWS Lambda (Node.js)
- API Gateway
- Amazon SQS + DLQ
- DynamoDB
- AWS X-Ray
- AWS SAM

## Deploying

```bash
git clone https://github.com/romelt777/tickethub-backend.git
cd tickethub-backend
sam build
sam deploy --guided
```

## Local Testing

- Each lambda includes a test-local.js file for local testing.
