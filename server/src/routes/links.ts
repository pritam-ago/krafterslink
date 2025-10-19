import express from 'express';
import { createLink, listLinks, getLink, deleteLink, updateLink } from '../controllers/linkController.js';
import {requireAuth} from '../middlewares/auth.js';

const router = express.Router();

router.use(requireAuth);
router.get('/', listLinks);
router.post('/', createLink);
router.get('/:id', getLink);
router.put('/:id', updateLink);
router.delete('/:id', deleteLink);

export default router;
