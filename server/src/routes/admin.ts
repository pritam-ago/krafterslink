import express from 'express';
import { getAllUsers, getPendingApprovals, approveUser, rejectUser, loginAdmin } from '../controllers/adminController.js';
import { isAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/users/pending', isAdmin, getPendingApprovals);
router.patch('/users/:id/approve', isAdmin, approveUser);
router.patch('/users/:id/reject', isAdmin, rejectUser);
router.get('/profiles', isAdmin, getAllUsers);

export default router;
