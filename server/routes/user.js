import express from 'express';
import { registerUser } from '../controllers/user.js';


const router = express.Router();


// POST Routes
router.post('/register', registerUser);



export default router;