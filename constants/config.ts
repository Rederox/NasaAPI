import dotenv from 'dotenv';
dotenv.config();

export const config = {
    PORT: process.env.PORT || 3000,
    API_KEY: process.env.API_KEY || "DEMO_KEY"
};