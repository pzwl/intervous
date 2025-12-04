import Session from "../models/Session.js";
import  { streamClient , chatClient } from "../lib/stream.js";
export async function createSession(req, res) {
    try {

        const {problem , difficulty } = req.body;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;


        if(!problem || !difficulty){
            return res.status(400).json({message: "Please provide problem and difficulty"});
        }

        // generate a unique call id for stream video 

        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;


        // create session in db
        const session = await Session.create({
            problem,
            difficulty,
            host: userId,
            callId
        })


        // create a stream call 

        await streamClient.video.call({
            data: {
                created_by_id: clerkId,
                custom: {problem, difficulty, sessionId: session._id.toString() },   
            },
            
        })

        // create chatbox
        const channel = chatClient.channel("messaging", callId, {
            name: `${problem} - ${difficulty} Session`,
            created_by_id: clerkId,
            members: [clerkId],
        })

        await channel.create();
        res.status(201).json({message: "Session created successfully"});
       
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed to create session"});
    }
}

export async function getActiveSessions(_, res) {
    try {
        
        const sessions = await Session.find({status: "active"})
         .populate("host", "name profilePicture email clerkId")
         .sort({createdAt: -1})
         .limit(20);

         res.status(200).json({sessions});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed to get active sessions"});
    }
}

export async function getMyRecentSessions(req, res) {
    try {
        
        const userId = req.user._id;

        // where is user is either host or participant
        const sessions = await Session.find({

            status: "completed",
            $or: [{host: userId}, {participants: userId}]
        }).sort({createdAt: -1}).limit(20);

        res.status(200).json({sessions});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed to get my recent sessions"});
    }
}

export async function getSessionById(req, res) {
    try {
        const id = req.params;

        const session = await Session.findById(id)
        .populate("host", "name profilePicture email clerkId")
        .populate("participants", "name profilePicture email clerkId") 

        if(!session){
            return res.status(404).json({message: "Session not found"});
        }

        res.status(200).json({session});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed to get session by id"});
    }
}

export async function joinSession(req, res) {
    try {

        const {id} = req.params;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        const session = await Session.findById(id);

        if(!session){
            return res.status(404).json({message: "Session not found"});
        }

        if(session.status === "completed"){
            return res.status(400).json({message: "Session is already completed"});
        }

        if(session.host.toString() === userId.toString()){
            return res.status(400).json({message: "You cannot join your own session"});
        }
        
        if(session.participant){
            return res.status(400).json({message: "Session is already full"});
        }

        session.participant = userId;
        await session.save();

        // after joining the session, we need to update the stream call and get to call 

        const channel = chatClient.channel("messaging", session.callId)
        await channel.addMembers([clerkId]);

        res.status(200).json({message: "Session joined successfully"});

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed to join session"});
    }
}

export async function endSession(req, res) {
    try {

        const {id} = req.params;
        const userId = req.user._id;
        const clerkId = req.user.clerkId;

        const session = await Session.findById(id);

        if(!session){
            return res.status(404).json({message: "Session not found"});
        }

        if(session.status === "completed"){
            return res.status(400).json({message: "Session is already completed"});
        }

        if(session.host.toString() !== userId.toString()){
            return res.status(403).json({message: "You are not the host of this session"});
        } 

        session.status = "completed";
        await session.save();

        // after ending the session, we need to delete the video and chat

        const call = streamClient.video.call("default",session.callId)
        await call.delete({hard: true})


        const channel = chatClient.channel("messaging", session.callId)
        await channel.delete();

        res.status(200).json({message: "Session ended successfully"});
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Failed to end session"});
    }
}
