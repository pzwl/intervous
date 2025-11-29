import {StreamChat} from 'stream-chat';
import {ENV} from './env.js';

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if(!apiKey || !apiSecret){
    console.warn("STREAM_API_KEY or STREAM_API_SECRET is not defined. Chat features will be disabled.");
}

export const chatClient = (apiKey && apiSecret) ? StreamChat.getInstance({apiKey, apiSecret}) : null;

export const upsertUser = async (user) => { // upsert meaning to insert or update
    if (!chatClient) {
        console.log("Stream Chat client not initialized. Skipping upsertUser.");
        return;
    }
    try{
        await chatClient.upsertUser(user);
        console.log(`Upserted user ${user.id} to Stream`);
    } catch (error){
        console.error("Error upserting users to Stream:", error);
    }

};


export const deleteUser = async (userID) => { // upsert meaning to insert or update
    if (!chatClient) {
        console.log("Stream Chat client not initialized. Skipping deleteUser.");
        return;
    }
    try{
        await chatClient.deleteUser(userID);
        console.log(`Deleted user ${userID} from Stream`);
    } catch (error){
        console.error("Error deleting user from Stream:", error);
    }

};


// todo : add another