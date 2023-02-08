import express from 'express';
import { generateOTP, resetSession, verifyOTP } from '../controllers/otp.js';
import { verifyUser } from '../middlewares/verifyUser.js';


const router = express.Router();


// GET routes
router.get('/generate-otp', verifyUser, generateOTP);
router.get('/verify-otp', verifyUser, verifyOTP);
router.get('/reset-session', resetSession);



export default router;