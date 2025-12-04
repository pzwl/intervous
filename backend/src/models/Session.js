import mongoose from "mongoose";


const sessionSchema = new mongoose.Schema({
    problemTitle: {
        type: String,
        required: true
    },

    problemDifficulty: {
        type: String,
        enum: ["easy" , "medium" , "hard"],
        required: true
    },

    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },    

    status: {
        type: String,
        enum: ["active", "completed"],
        default: "active"
    },

    // stream videocall id
    callId: {
        type: String,
        default: ""
    }
    
    
} , {
    timestamps: true // so we can have fields like created and updated at 
})

const Session = mongoose.model("Session" , sessionSchema);

export default Session;
