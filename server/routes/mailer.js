import express from 'express';
import { mailer } from '../controllers/mailer.js';

const router = express.Router();

router.post('/register-mail', mailer)

export default router;