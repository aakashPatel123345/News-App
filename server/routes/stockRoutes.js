import express from 'express';
import { getStockData } from '../controllers/stockController.js';

const router = express.Router();

router.get('/:ticker', getStockData)

export default router;

// Route to get stock data