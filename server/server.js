import app from './app.js';
import mongoose from 'mongoose'

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 8000;

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            console.warn('MONGO_URI not found in environment variables');
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
