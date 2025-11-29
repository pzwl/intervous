import {StreamChat} from 'stream-chat';
import {ENV} from './env.js';

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    throw new Error("STREAM_API_KEY or STREAM_API_SECRET is not defined");
}

export const chatClient = new StreamChat(apiKey, apiSecret);

export const upsertUser = async (user) => { // upsert meaning to insert or update
    try{
        const response = await chatClient.upsertUser(user);
        console.log(`Upserted user ${user.id} to Stream. Response:`, JSON.stringify(response));
    } catch (error){
        console.error("Error upserting users to Stream:", error);
    }

};


export const deleteUser = async (userID) => { // upsert meaning to insert or update
    try{
        await chatClient.deleteUser(userID);
        console.log(`Deleted user ${userID} from Stream`);
    } catch (error){
        // Ignore 404 errors (user not found)
        if (error.code === 16 || error.StatusCode === 404) {
            console.log(`User ${userID} not found in Stream, skipping delete.`);
            return;
        }
        console.error("Error deleting user from Stream:", error);
    }

};


// todo : add another