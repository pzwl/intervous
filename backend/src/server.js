import express from 'express';
import {ENV} from './lib/env.js';
import path from 'path';
import cors from 'cors';
import { serve } from 'inngest/express'
import { functions, inngest } from './lib/inngest.js';
import { connectDB } from './lib/db.js';
import { clerkMiddleware } from '@clerk/express'
import chatRoutes from './routes/chatRoutes.js';



const app = express();

const __dirname = path.resolve();

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware());
app.use("/api/inngest", serve({client:inngest , functions}));
// credentials true -> to allow cookies to be sent along with requests from the client


// when we pass an array of middleware to express , it automatically flattens and execute the sequentially , one by one 

app.get('/health' , (req,res) =>{
    res.status(200).json({message: "API is running..."});
})


app.get('/api/chat' , chatRoutes , )


if(ENV.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
    app.get('/{*any}', (req,res) =>{
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}





const startServer = async () => {
    try {
        await connectDB();
        app.listen(ENV.PORT, () => console.log('Server is running on port ' + ENV.PORT));
    } catch (error) {
        console.error("Failed to start server: ", error);   
    }
}

startServer();