import {StreamChat} from 'stream-chat';
export const upsertUser = async (user) => { // upsert meaning to insert or update
    try{
        await chatClient.upsertUser(user);
        console.log(`Upserted user ${user.id} to Stream`);
    } catch (error){
        console.error("Error upserting users to Stream:", error);
    }

};


export const deleteUser = async (userID) => { // upsert meaning to insert or update
    try{
        await chatClient.deleteUser(userID);
        console.log(`Deleted user ${userID} from Stream`);
    } catch (error){
        console.error("Error deleting user from Stream:", error);
    }

};


// todo : add another 