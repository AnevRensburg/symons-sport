import { Injectable, signal } from '@angular/core';
import { apiUrl } from '../core/api';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  mustChangePassword: boolean;
}

export interface Region {
  id: string;
  name: string;
}

export interface AdminDealer {
  id: string;
  name: string;
  region: string;
  phone: string;
  tel: string;
  address: string;
}

export type DealerInput = Pick<AdminDealer, 'name' | 'region' | 'phone' | 'address'>;

export interface Analytics {
  source: 'ga4' | 'sample';
  days: number;
  totals: { users: number; sessions: number; pageViews: number; avgSessionSeconds: number };
  daily: { date: string; users: number; sessions: number }[];
  topPages: { path: string; views: number }[];
  channels: { name: string; sessions: number }[];
  devices: { name: string; sessions: number }[];
}

const TOKEN_KEY = 'ssi-admin-token';

function stored(): string {
  try {
    return localStorage.getItem(TOKEN_KEY) ?? '';
  } catch {
    return '';
  }
}

function store(token: string): void {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
  } catch {
    // Private mode: the login lasts until the tab is closed.
  }
}

/** Calls to the dealers API for the admin page, with the signed-in admin's token. */
@Injectable({ providedIn: 'root' })
export class AdminApi {
  private token = stored();
  readonly user = signal<AdminUser | null>(null);

  get hasToken(): boolean {
    return Boolean(this.token);
  }

  private async request<T>(method: string, path: string, body?: unknown): Promise<T> {
    let res: Response;
    try {
      res = await fetch(`${apiUrl()}/api${path}`, {
        method,
        headers: {
          ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
          ...(this.token ? { Authorization: `Bearer ${this.token}` } : {}),
        },
        body: body === undefined ? undefined : JSON.stringify(body),
      });
    } catch {
      throw new Error(
        'The server could not be reached. Check your internet connection and try again.',
      );
    }
    if (res.status === 204) return undefined as T;
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      if (res.status === 401 && this.token) this.signOut();
      throw new Error(data.error ?? 'Something went wrong. Please try again.');
    }
    return data as T;
  }

  private signedIn({ token, user }: { token: string; user: AdminUser }): void {
    this.token = token;
    store(token);
    this.user.set(user);
  }

  async login(email: string, password: string): Promise<void> {
    this.signedIn(await this.request('POST', '/auth/login', { email, password }));
  }

  /** Restores the session from a stored token (false when there is none or it has expired). */
  async restore(): Promise<boolean> {
    if (!this.token) return false;
    try {
      this.user.set(await this.request<AdminUser>('GET', '/auth/me'));
      return true;
    } catch {
      return false;
    }
  }

  async changePassword(current: string, password: string): Promise<void> {
    this.signedIn(await this.request('POST', '/auth/password', { current, password }));
  }

  signOut(): void {
    this.token = '';
    store('');
    this.user.set(null);
  }

  regions = () => this.request<Region[]>('GET', '/admin/regions');
  dealers = () => this.request<AdminDealer[]>('GET', '/admin/dealers');
  addDealer = (d: DealerInput) => this.request<AdminDealer>('POST', '/admin/dealers', d);
  saveDealer = (id: string, d: DealerInput) =>
    this.request<AdminDealer>('PUT', `/admin/dealers/${id}`, d);
  removeDealer = (id: string) => this.request<void>('DELETE', `/admin/dealers/${id}`);
  analytics = (days: number) => this.request<Analytics>('GET', `/admin/analytics?days=${days}`);
}
