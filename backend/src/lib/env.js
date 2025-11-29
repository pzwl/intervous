import dotenv from 'dotenv';
dotenv.config();

// Debug: Log to verify env vars are loaded
console.log('DEBUG - STREAM_API_KEY exists:', !!process.env.STREAM_API_KEY);
console.log('DEBUG - STREAM_API_SECRET exists:', !!process.env.STREAM_API_SECRET);

export const ENV = {
    PORT : process.env.PORT,
    NODE_ENV : process.env.NODE_ENV,
    DB_URL : process.env.DB_URL,
    CLIENT_URL : process.env.CLIENT_URL,
    INNGEST_EVENT_KEY : process.env.INNGEST_EVENT_KEY,
    INNGEST_SIGNING_KEY : process.env.INNGEST_SIGNING_KEY,
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
};