import { type Config, type HandlerContext, type Handler, type HandlerEvent, type HandlerResponse } from "@netlify/functions"

interface ExtendedHandlerContext extends HandlerContext {
    params?: {
        userID: string;
        [key: string]: string;
    };
};

export default async (event: HandlerEvent, context: ExtendedHandlerContext): Promise<Response> => {
    const userID = context.params?.userID

    console.log("Function called with userID:", userID);

    // Use the Response object format instead of the older object format
    return new Response(
        JSON.stringify({ userID }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
                'Access-Control-Allow-Methods': 'GET, OPTIONS'
            }
        }
    );
};

export const config: Config = {
    path: '/api/users/:userID'
};