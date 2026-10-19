import bcrypt from 'bcryptjs';
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { requireLogin, signToken } from '../lib/auth.ts';
import { HttpError, parse } from '../lib/http.ts';
import { UserModel } from '../models.ts';

export const authRouter = Router();

// Slows down password guessing: 20 attempts per 15 minutes per IP.
const limiter = rateLimit({
  windowMs: 15 * 60_000,
  limit: Number(process.env.AUTH_RATE_LIMIT ?? 20),
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many attempts. Please wait 15 minutes and try again.' },
});

const profile = (u: { _id: unknown; email: string; name: string; mustChangePassword: boolean }) => ({
  id: String(u._id),
  email: u.email,
  name: u.name,
  mustChangePassword: u.mustChangePassword,
});

authRouter.post('/login', limiter, async (req, res) => {
  const { email, password } = parse(z.object({ email: z.email(), password: z.string().min(1) }), req.body);
  const user = await UserModel.findOne({ email: email.toLowerCase() }).select('+passwordHash');
  // Same message for an unknown email and a wrong password, so logins can't be discovered.
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) throw new HttpError(401, 'Email or password is incorrect.');
  res.json({ token: signToken(String(user._id)), user: profile(user) });
});

authRouter.get('/me', requireLogin, async (req, res) => {
  const user = await UserModel.findById(req.user!.id).lean();
  if (!user) throw new HttpError(401, 'Please log in again.');
  res.json(profile(user));
});

const passwordSchema = z.object({
  current: z.string().min(1, 'Please fill in your current password.'),
  password: z.string().min(8, 'Please use at least 8 characters.').max(200),
});

/** Change the password (also used to replace a generated one). Signs out every other session. */
authRouter.post('/password', limiter, requireLogin, async (req, res) => {
  const { current, password } = parse(passwordSchema, req.body);
  const user = await UserModel.findById(req.user!.id).select('+passwordHash');
  if (!user) throw new HttpError(401, 'Please log in again.');
  if (!(await bcrypt.compare(current, user.passwordHash))) throw new HttpError(400, 'Your current password is incorrect.');
  if (current === password) throw new HttpError(400, 'Please choose a different password from your current one.');
  user.passwordHash = await bcrypt.hash(password, 10);
  user.mustChangePassword = false;
  // Rounded down to the second like token times, so the new token below stays valid.
  user.passwordChangedAt = new Date(Math.floor(Date.now() / 1000) * 1000);
  await user.save();
  res.json({ token: signToken(String(user._id)), user: profile(user) });
});
