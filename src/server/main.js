import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

const API = express();
const PORT = process.env.PORT || 3000;

API.use(cors());
API.use(express.json());
API.use('/users', userRoutes);

API.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});