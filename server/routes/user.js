import express from 'express';
import { registerUser, getUser, updateUser } from '../controllers/user.js';
import { Auth } from '../middlewares/auth.js';


const router = express.Router();


// POST Routes
router.post('/register', registerUser);


// GET routes
router.get('/getuser/:userName', getUser)


// PUT routes
router.put('/updateuser', Auth, updateUser)



export default router;