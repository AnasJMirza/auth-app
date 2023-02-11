import express from 'express';

import { loginUser } from '../controllers/auth.js';
import { verifyUser } from '../middlewares/verifyUser.js';

const router = express.Router();


// POST routes
router.post('/login', verifyUser, loginUser);
router.post('/authenticate', verifyUser, (req, res) => res.end());


export default router;