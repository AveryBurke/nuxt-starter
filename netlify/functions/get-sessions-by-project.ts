import { type Config, type HandlerContext, type Handler, type HandlerEvent } from "@netlify/functions"
import { DynamoDB } from "aws-sdk";


interface ExtendedHandlerContext extends HandlerContext {
    params?: {
        projectId: string;
        [key: string]: string;
    };
}


const initDynamoDB = (): DynamoDB.DocumentClient => {
    return new DynamoDB.DocumentClient({
        region: process.env.DYNAMO_REGION,
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY || '',
            secretAccessKey: process.env.AWS_ACCESS_KEY || ''
        }
    });
}

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
};

export const config: Config = {
    path: "/p/:projectId"
};

export default async (event: HandlerEvent, context: ExtendedHandlerContext) => {
    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers };
    }

    // Ensure this is a GET request
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Access the projectId directly from the context.params object
        const projectId = context.params?.projectId;

        if (!projectId) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Project ID is required' })
            };
        }

        console.log(`Fetching sessions for project: ${projectId}`);

        const dynamodb = initDynamoDB();

        // Query using a GSI (Global Secondary Index) on projectId
        const params: DynamoDB.DocumentClient.QueryInput = {
            TableName: "session",
            IndexName: 'projectId-index',
            KeyConditionExpression: 'projectId = :projectId',
            ExpressionAttributeValues: {
                ':projectId': projectId
            }
        };

        const result = await dynamodb.query(params).promise();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                sessions: result.Items,
                count: result.Count || 0
            })
        };
    } catch (error) {
        console.error('Error fetching sessions:', error);

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to fetch sessions',
                message: (error as Error).message
            })
        };
    }
};

