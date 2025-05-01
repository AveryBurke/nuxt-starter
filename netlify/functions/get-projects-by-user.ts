import { type Config, type HandlerContext, type Handler, type HandlerEvent } from "@netlify/functions"
// import { DynamoDB } from "aws-sdk";


interface ExtendedHandlerContext extends HandlerContext {
    params?: {
        userID: string;
        [key: string]: string;
    };
};

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
};

export default async (event: HandlerEvent, context: ExtendedHandlerContext) => {
    const userID = context.params?.userID
    console.log({ userID })
    return { statusCode: 200, headers, body: userID }
};


export const config: Config = {
    path: '/api/users/:userID'
};