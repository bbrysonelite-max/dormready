import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import schoolsRouter from './routes/schools';
import leadsRouter from './routes/leads';

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors({ origin: process.env.FRONTEND_URL ?? '*' }));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: { error: 'Too many requests', code: 'RATE_LIMITED' },
});
app.use(limiter);

// Stricter limit on lead capture to prevent spam
const leadsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: { error: 'Too many requests', code: 'RATE_LIMITED' },
});

app.get('/health', (_req, res) => res.json({ ok: true }));

app.use('/api/schools', schoolsRouter);
app.use('/api/leads', leadsLimiter, leadsRouter);

app.listen(PORT, () => {
  console.log(`DormReady API running on port ${PORT}`);
});
