import type { NextFunction, Request, Response } from 'express';
import { randomInt } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { env } from '../env.ts';
import { HttpError } from './http.ts';
import { UserModel } from '../models.ts';

export interface AuthUser {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  /** Still on a generated password: may only set a new one. */
  readonly setup: boolean;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

const AUDIENCE = 'symons-admin';

export function signToken(userId: string): string {
  return jwt.sign({}, env.jwtSecret, { subject: userId, expiresIn: '7d', audience: AUDIENCE });
}

/**
 * The signed-in admin as they are now: a removed login or a password change (which signs out
 * every other session) takes effect immediately.
 */
async function currentUser(req: Request): Promise<AuthUser> {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) throw new HttpError(401, 'Please log in first.');
  let payload: jwt.JwtPayload;
  try {
    payload = jwt.verify(header.slice(7), env.jwtSecret, { audience: AUDIENCE }) as jwt.JwtPayload;
  } catch {
    throw new HttpError(401, 'Your session has expired. Please log in again.');
  }
  const user = await UserModel.findById(payload.sub).lean();
  if (!user) throw new HttpError(401, 'This login no longer exists.');
  if (user.passwordChangedAt && (payload.iat ?? 0) * 1000 < user.passwordChangedAt.getTime()) {
    throw new HttpError(401, 'Your password was changed. Please log in again.');
  }
  return { id: String(user._id), email: user.email, name: user.name, setup: user.mustChangePassword };
}

/** Signed in (a generated password is allowed: used only for choosing a new one). */
export async function requireLogin(req: Request, _res: Response, next: NextFunction): Promise<void> {
  req.user = await currentUser(req);
  next();
}

/** Signed in with their own password. */
export async function requireAdmin(req: Request, _res: Response, next: NextFunction): Promise<void> {
  req.user = await currentUser(req);
  if (req.user.setup) throw new HttpError(403, 'Please choose your own password first.');
  next();
}

/** A readable generated password, e.g. "Kx7m-Qp4R-t9Wz" (no 0/O, 1/l/I). */
export function tempPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  const group = () => Array.from({ length: 4 }, () => chars[randomInt(chars.length)]).join('');
  return `${group()}-${group()}-${group()}`;
}
