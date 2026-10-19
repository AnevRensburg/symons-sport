/** Runtime configuration (environment variables; see .env.example). */
function required(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined || value === '') throw new Error(`Missing environment variable ${name}`);
  return value;
}

const isProduction = process.env.NODE_ENV === 'production';

export const env = {
  isProduction,
  port: Number(process.env.PORT ?? 4004),
  mongoUrl: required('MONGO_URL', 'mongodb://127.0.0.1:27017/symons'),
  // A fixed dev secret keeps local logins working across restarts; production must set its own.
  jwtSecret: isProduction ? required('JWT_SECRET') : required('JWT_SECRET', 'dev-only-symons-secret'),
  /** Comma-separated front-end origins allowed to call the API. */
  corsOrigins: (process.env.CORS_ORIGINS ?? 'http://localhost:4200,http://localhost:8080')
    .split(',')
    .map((s) => s.trim()),
  /** Proxy hops in front of the API (Render's load balancer = 1), for the login rate limit. */
  trustProxy: Number(process.env.TRUST_PROXY ?? 1),
  analytics: {
    /** GA4 property id (numbers only). Without it (or credentials) the dashboard shows sample data. */
    ga4PropertyId: process.env.GA4_PROPERTY_ID ?? '',
    /** Service-account JSON, inline. Alternatively set GOOGLE_APPLICATION_CREDENTIALS to a file path. */
    credentialsJson: process.env.GA4_CREDENTIALS_JSON ?? '',
  },
};
