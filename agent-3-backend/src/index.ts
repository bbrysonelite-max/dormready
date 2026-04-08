import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import schoolsRouter from './routes/schools';
import leadsRouter from './routes/leads';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/schools', schoolsRouter);
app.use('/api/leads', leadsRouter);

app.listen(PORT, () => {
  console.log(`DormReady API running on port ${PORT}`);
});
