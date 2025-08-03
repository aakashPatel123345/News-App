import express from 'express';
import stockRoutes from './routes/stockRoutes.js';
import newsRoutes from './routes/newsRoutes.js';

const app = express();
app.use(express.json());

app.use('/api', stockRoutes);
app.use('/api', newsRoutes);

export default app;