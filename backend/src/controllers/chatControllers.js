import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req , res){
    try {
        // we use clerkId , not mongodb(_id) cause it should match with id that we have inserted in the stream dashboard 
        const token = chatClient.createToken(req.user.clerkId);
        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image
        })

    } catch (error) {
        console.error("Error in getStreamToken controller: ", error);
        res.status(500).json({message: "Internal server error"});
    }
}