import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router(0);

router.post('/signup', signup);


export default router;