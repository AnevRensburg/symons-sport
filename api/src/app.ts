import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { env } from './env.ts';
import { errorHandler, notFound } from './lib/http.ts';
import { adminRouter } from './routes/admin.ts';
import { authRouter } from './routes/auth.ts';
import { publicRouter } from './routes/public.ts';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', env.trustProxy);
  app.use(helmet());
  app.use(cors({ origin: env.corsOrigins }));
  app.use(express.json({ limit: '50kb' }));

  app.get('/api/health', (_req, res) => res.json({ ok: true }));
  app.use('/api', publicRouter);
  app.use('/api/auth', authRouter);
  app.use('/api/admin', adminRouter);
  app.use('/api', () => {
    throw notFound();
  });
  app.use(errorHandler);
  return app;
}
