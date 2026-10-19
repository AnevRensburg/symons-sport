import type { NextFunction, Request, Response } from 'express';
import { z, ZodError } from 'zod';

export class HttpError extends Error {
  readonly status: number;
  readonly details?: unknown;
  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export const notFound = (what = 'Not found') => new HttpError(404, what);
export const badRequest = (message: string, details?: unknown) => new HttpError(400, message, details);

/** Parses and returns `data` against `schema`, throwing a 400 with field errors when it doesn't fit. */
export function parse<T extends z.ZodType>(schema: T, data: unknown): z.infer<T> {
  return schema.parse(data);
}

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ZodError) {
    // Lead with the first field's own message (e.g. "Please fill in a category.") when it's a sentence.
    const fields = z.flattenError(err).fieldErrors as Record<string, string[] | undefined>;
    const first = Object.values(fields).flat().find((m) => m && /^Please /.test(m));
    res.status(400).json({ error: first ?? 'Please check the highlighted fields.', fields: first ? undefined : fields });
    return;
  }
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message, details: err.details });
    return;
  }
  // Duplicate key (e.g. an email that is already registered).
  if (typeof err === 'object' && err && 'code' in err && (err as { code: number }).code === 11000) {
    res.status(409).json({ error: 'That already exists.' });
    return;
  }
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on our side. Please try again.' });
}

/** Pagination from ?page=&limit= with sane bounds. */
export function paging(query: Request['query']): { skip: number; limit: number; page: number } {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(query.limit) || 25));
  return { page, limit, skip: (page - 1) * limit };
}
