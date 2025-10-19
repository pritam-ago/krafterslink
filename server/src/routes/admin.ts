import express from 'express';
import { getPendingUsers, updateUserStatus } from '../controllers/adminController.js';
import { requireAuth, restrictTo } from '../middlewares/auth.js';

const router = express.Router();

router.use(requireAuth);
router.use(restrictTo('HEAD', 'PRESIDENT'));

router.get('/users/pending', getPendingUsers);
router.patch('/users/:id/status', updateUserStatus);

export default router;