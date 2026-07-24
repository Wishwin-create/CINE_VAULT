import express from 'express';
import {protect} from '../middleware/auth.js';
import { getWatchlist, addToWatchlist, removeFromWatchlist } from '../controllers/watchlistController.js';


const router =express.Router();
 router.get('/',protect, getWatchlist);
 router.post('/:mediaId' , protect, addToWatchlist);
 router.delete('/:mediaId' , protect, removeFromWatchlist);

export default router;
