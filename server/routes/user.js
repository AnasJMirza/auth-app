import express from 'express';
import { registerUser, getUser, updateUser } from '../controllers/user.js';


const router = express.Router();


// POST Routes
router.post('/register', registerUser);


// GET routes
router.get('/getuser/:userName', getUser)


// PUT routes
router.put('/updateuser', updateUser)



export default router;