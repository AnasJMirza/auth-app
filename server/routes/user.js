import express from 'express';
import { registerUser, getUser } from '../controllers/user.js';


const router = express.Router();


// POST Routes
router.post('/register', registerUser);


// GET routes
router.get('/getuser/:userName', getUser)



export default router;