import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import mediaRoutes from './routes/media.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/media', mediaRoutes);

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => 
    console.log(`Server running on http://localhost: ${PORT}`));