import express from 'express';
import { getProfile, updateProfile } from '../controllers/userController.js';
import requireAuth from '../middlewares/auth.js';

const router = express.Router();

router.get('/me', requireAuth, getProfile);
router.put('/me', requireAuth, updateProfile);

export default router;
