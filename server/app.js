import express from 'express'
import stockRoutes from './routes/stockRoutes.js'

const app = express();
app.use(express.json())

app.use('/api', stockRoutes);

export default app;