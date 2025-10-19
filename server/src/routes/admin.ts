import express from 'express';
import { getAllUsers, getPendingApprovals, approveUser, rejectUser, loginAdmin } from '../controllers/adminController.js';
import isAdmin from '../middlewares/auth.js';

const router = express.Router();

router.get('/users', isAdmin, getAllUsers);
router.get('/approvals', isAdmin, getPendingApprovals);
router.post('/approve', isAdmin, approveUser);
router.post('/reject', isAdmin, rejectUser);
router.post('/login', loginAdmin);

export default router;
