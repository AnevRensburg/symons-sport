import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminApi } from './admin-api';
import { AnalyticsAdmin } from './analytics-admin';
import { DealersAdmin } from './dealers-admin';

type Tab = 'dealers' | 'analytics';

/**
 * The owner's admin page at /admin (not linked anywhere, not indexed). Signs in against the
 * dealers API, then shows the Dealers and Website analytics tabs.
 */
@Component({
  selector: 'app-admin',
  imports: [FormsModule, DealersAdmin, AnalyticsAdmin],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrl: './admin.scss',
  template: `
    <div class="admin">
      @if (state() === 'loading') {
        <p class="admin-center muted">Loading…</p>
      } @else if (!api.user()) {
        <form class="admin-center card auth-card" (ngSubmit)="login()">
          <img
            src="/images/logos/ssi-logo-250.webp"
            alt="Symons Sport International"
            width="160"
            height="56"
          />
          <h1>Admin login</h1>
          <label class="field"
            ><span>Email</span
            ><input name="email" type="email" autocomplete="username" [(ngModel)]="email" required
          /></label>
          <label class="field"
            ><span>Password</span
            ><input
              name="password"
              type="password"
              autocomplete="current-password"
              [(ngModel)]="password"
              required
          /></label>
          @if (error()) {
            <p class="error" role="alert">{{ error() }}</p>
          }
          <button class="btn" type="submit" [disabled]="busy()">
            {{ busy() ? 'Logging in…' : 'Log in' }}
          </button>
        </form>
      } @else if (api.user()!.mustChangePassword || changingPassword()) {
        <form class="admin-center card auth-card" (ngSubmit)="setPassword()">
          <h1>
            {{
              api.user()!.mustChangePassword ? 'Choose your own password' : 'Change your password'
            }}
          </h1>
          @if (api.user()!.mustChangePassword) {
            <p class="muted">
              Welcome, {{ api.user()!.name }}. Please replace the password you were given with one
              only you know.
            </p>
          }
          <label class="field"
            ><span>{{
              api.user()!.mustChangePassword ? 'Password you were given' : 'Current password'
            }}</span>
            <input
              name="current"
              type="password"
              autocomplete="current-password"
              [(ngModel)]="current"
              required
          /></label>
          <label class="field"
            ><span>New password <small class="muted">(at least 8 characters)</small></span>
            <input
              name="new"
              type="password"
              autocomplete="new-password"
              minlength="8"
              [(ngModel)]="newPassword"
              required
          /></label>
          @if (error()) {
            <p class="error" role="alert">{{ error() }}</p>
          }
          <div class="actions">
            <button class="btn" type="submit" [disabled]="busy()">Save password</button>
            @if (api.user()!.mustChangePassword) {
              <button class="btn btn--ghost" type="button" (click)="logout()">Log out</button>
            } @else {
              <button class="btn btn--ghost" type="button" (click)="changingPassword.set(false)">
                Cancel
              </button>
            }
          </div>
        </form>
      } @else {
        <header class="admin-bar">
          <div class="admin-bar__inner">
            <a href="/" class="admin-bar__logo" title="Open the website">
              <img
                src="/images/logos/ssi-logo-250.webp"
                alt="Symons Sport International"
                width="120"
                height="42"
              />
            </a>
            <nav class="admin-tabs" aria-label="Admin sections">
              <button
                type="button"
                [class.on]="tab() === 'dealers'"
                [attr.aria-current]="tab() === 'dealers' ? 'page' : null"
                (click)="tab.set('dealers')"
              >
                Dealers
              </button>
              <button
                type="button"
                [class.on]="tab() === 'analytics'"
                [attr.aria-current]="tab() === 'analytics' ? 'page' : null"
                (click)="tab.set('analytics')"
              >
                Website analytics
              </button>
            </nav>
            <div class="admin-bar__user">
              <span class="muted">{{ api.user()!.name }}</span>
              <button type="button" class="link" (click)="startPasswordChange()">
                Change password
              </button>
              <button type="button" class="link" (click)="logout()">Log out</button>
            </div>
          </div>
        </header>
        @if (notice()) {
          <p class="notice admin-main">{{ notice() }}</p>
        }
        <div class="admin-main">
          @if (tab() === 'dealers') {
            <app-admin-dealers />
          } @else {
            <app-admin-analytics />
          }
        </div>
      }
    </div>
  `,
})
export class Admin {
  protected readonly api = inject(AdminApi);
  readonly state = signal<'loading' | 'ready'>('loading');
  readonly tab = signal<Tab>('dealers');
  readonly busy = signal(false);
  readonly error = signal('');
  readonly notice = signal('');
  readonly changingPassword = signal(false);
  email = '';
  password = '';
  current = '';
  newPassword = '';

  constructor() {
    void this.api.restore().finally(() => this.state.set('ready'));
  }

  private async run(action: () => Promise<void>): Promise<void> {
    if (this.busy()) return;
    this.busy.set(true);
    this.error.set('');
    try {
      await action();
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.busy.set(false);
    }
  }

  login(): Promise<void> {
    return this.run(async () => {
      await this.api.login(this.email.trim(), this.password);
      this.password = '';
    });
  }

  startPasswordChange(): void {
    this.error.set('');
    this.notice.set('');
    this.changingPassword.set(true);
  }

  setPassword(): Promise<void> {
    return this.run(async () => {
      if (this.newPassword.length < 8) throw new Error('Please use at least 8 characters.');
      await this.api.changePassword(this.current, this.newPassword);
      this.current = this.newPassword = '';
      this.changingPassword.set(false);
      this.notice.set(
        'Your password is saved. Any other devices you were logged in on are now logged out.',
      );
    });
  }

  logout(): void {
    this.api.signOut();
    this.changingPassword.set(false);
    this.notice.set('');
    this.error.set('');
  }
}
