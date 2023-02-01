import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.js';
import authRoutes from './routes/auth.js';
import { connectDB } from './database/connection.js'


dotenv.config();
const app = express();

// Middlewares
app.use(express.json())  // to parse the data from post requests
app.use(cors());  // for sharing data between different domains
app.disable('x-powered-by'); // less hackers know about our stack


// GET Post
app.get('/', (req, res) => res.send('Hello from Auth!'));


// API Routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);





// Connect DB and start server
const port = 8080 || process.env.port;
const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Server Started! http://localhost:${port}/`));
    } catch (error) {
        console.log(error);
    }
}
startServer();