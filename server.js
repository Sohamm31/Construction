import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth1.js';
import constructorRoutes from './routes/constructor.js';
import  addDefaultConstructor  from './addDefaultConstructor.js';
import 'dotenv/config'
const app = express();
const PORT = process.env.PORT || 2024;  // Ensure this matches the port you are testing
const URI = 'mongodb://localhost:27017/Construction';  // Ensure this is correct

app.use(cors());
app.use(express.json());

mongoose.connect(URI)
  .then(async () => {
    console.log('MongoDB connected');
    await addDefaultConstructor();  // Ensure default constructor is added after connection
    app.use('/api/auth', authRoutes);
    app.use('/api/constructor', constructorRoutes);

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
