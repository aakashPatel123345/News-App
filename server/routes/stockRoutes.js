import express from 'express';
import { getStockData } from '../controllers/stockController.js';

const router = express.Router();

router.get('/stocks/:ticker', getStockData)

export default router;