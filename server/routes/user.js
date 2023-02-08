import express from 'express';
import { registerUser, getUser, updateUser, resetPassword } from '../controllers/user.js';
import { Auth } from '../middlewares/auth.js';
import { verifyUser } from '../middlewares/verifyUser.js';



const router = express.Router();


// POST Routes
router.post('/register', registerUser);


// GET routes
router.get('/getuser/:userName', getUser);


// PUT routes
router.put('/updateuser', Auth, updateUser);
router.put('/reset-password', verifyUser ,resetPassword);



export default router;