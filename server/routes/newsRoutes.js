import express from 'express';
import { getNewsData } from '../controllers/newsController.js';

const router = express.Router();

router.get('/news/:companyName', getNewsData);

export default router;