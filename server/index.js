import express from 'express';
import cors from 'cors';


const app = express();


// Middlewares
app.use(express.json())  // to parse the data from post requests
app.use(cors());  // for sharing data between different domains
app.disable('x-powered-by'); // less hackers know about our stack


// GET Post
app.get('/', (req, res) => res.send('Hello from Auth!'));



const port = 8080 || process.env.port;

app.listen(port, console.log('Server started...'));