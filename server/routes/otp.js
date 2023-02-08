import express from 'express';
import { generateOTP } from '../controllers/otp.js';
import { verifyUser } from '../middlewares/verifyUser.js';


const router = express.Router();




// GET routes
router.get('/generate-otp', verifyUser, generateOTP);
router.get('/verify-otp', ()=>{});



export default router;