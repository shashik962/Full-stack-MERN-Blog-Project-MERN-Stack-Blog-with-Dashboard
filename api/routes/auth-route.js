import express from 'express';
import { signup, signin } from '../controllers/auth.controller.js';

const router = express.Router(0);

router.post('/signup', signup);
router.post('/signin', signin);


export default router;