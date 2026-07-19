import express from 'express';
import { getMedia, getFeatured, getMediaById, streamMedia } from '../controllers/mediaController.js';

const router = express.Router();

// Order matters — /featured must come before /:id or Express will treat "featured" as an id
router.get('/featured', getFeatured);
router.get('/:id/stream', streamMedia);
router.get('/:id', getMediaById);
router.get('/', getMedia);

export default router;