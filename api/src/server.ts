import mongoose from 'mongoose';
import { createApp } from './app.ts';
import { env } from './env.ts';

await mongoose.connect(env.mongoUrl);
createApp().listen(env.port, () => console.log(`Symons Sport API on http://localhost:${env.port}`));
