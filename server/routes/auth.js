import express from 'express';

import { loginUser } from '../controllers/auth.js';

const router = express.Router();


// POST routes
router.post('/login', loginUser);


export default router;