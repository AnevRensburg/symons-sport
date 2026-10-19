import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminApi, type AdminDealer, type DealerInput, type Region } from './admin-api';

const EMPTY: DealerInput = { name: '', region: '', phone: '', address: '' };

/** Dealers tab: search, add, edit and remove. Changes show on the website's dealers page at once. */
@Component({
  selector: 'app-admin-dealers',
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="page-head">
      <div>
        <h1>Dealers</h1>
        <p class="muted">
          {{ dealers().length }} dealers. Changes show on the
          <a href="/dealers" target="_blank" rel="noopener">dealers page</a> straight away.
        </p>
      </div>
      <button type="button" class="btn" (click)="startAdd()">Add a dealer</button>
    </header>

    @if (notice()) {
      <p class="notice" role="status">{{ notice() }}</p>
    }
    @if (error()) {
      <p class="error" role="alert">{{ error() }}</p>
    }

    @if (form(); as f) {
      <form class="card dealer-form" #formEl (ngSubmit)="save()">
        <h2>{{ editingId() ? 'Edit ' + editingName() : 'New dealer' }}</h2>
        <div class="fields">
          <label class="field">
            <span>Company name</span>
            <input name="name" [(ngModel)]="f.name" required maxlength="120" />
          </label>
          <label class="field">
            <span>Province or country</span>
            <select name="region" [(ngModel)]="f.region" required>
              <option value="" disabled>Choose…</option>
              @for (r of regions(); track r.id) {
                <option [value]="r.id">{{ r.name }}</option>
              }
            </select>
          </label>
          <label class="field">
            <span>Phone</span>
            <input
              name="phone"
              type="tel"
              [(ngModel)]="f.phone"
              required
              maxlength="40"
              placeholder="021 975 9629"
            />
            <small class="muted"
              >Written as it should appear. For a number outside South Africa, start with the
              country code, e.g. +264 61 123 456.</small
            >
          </label>
          <label class="field field--wide">
            <span>Address <small class="muted">(optional)</small></span>
            <input name="address" [(ngModel)]="f.address" maxlength="250" />
          </label>
        </div>
        @if (formError()) {
          <p class="error" role="alert">{{ formError() }}</p>
        }
        <div class="actions">
          <button class="btn" type="submit" [disabled]="busy()">
            {{ busy() ? 'Saving…' : 'Save' }}
          </button>
          <button class="btn btn--ghost" type="button" (click)="closeForm()">Cancel</button>
        </div>
      </form>
    }

    <div class="toolbar">
      <label class="field">
        <span class="visually-hidden">Search dealers</span>
        <input
          type="search"
          placeholder="Search by name, town or phone"
          [ngModel]="query()"
          (ngModelChange)="query.set($event)"
        />
      </label>
      <label class="field">
        <span class="visually-hidden">Province or country</span>
        <select [ngModel]="regionFilter()" (ngModelChange)="regionFilter.set($event)">
          <option value="">All provinces and countries</option>
          @for (r of regions(); track r.id) {
            <option [value]="r.id">{{ r.name }} ({{ countIn(r.id) }})</option>
          }
        </select>
      </label>
      @if (query() || regionFilter()) {
        <span class="muted">{{ shown().length }} shown</span>
      }
    </div>

    <div class="card card--flush table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Province / country</th>
            <th>Tel</th>
            <th>Address</th>
            <th><span class="visually-hidden">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          @for (d of shown(); track d.id) {
            <tr [class.just-saved]="d.id === savedId()">
              <td>
                <strong>{{ d.name }}</strong>
              </td>
              <td>{{ regionName(d.region) }}</td>
              <td class="nowrap">{{ d.phone }}</td>
              <td>{{ d.address }}</td>
              <td class="row-actions">
                <button type="button" class="link" (click)="startEdit(d)">Edit</button>
                <button type="button" class="link danger" (click)="askRemove(d)">Remove</button>
              </td>
            </tr>
          } @empty {
            <tr>
              <td colspan="5" class="muted">
                {{ loading() ? 'Loading dealers…' : 'No dealers match.' }}
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>

    <dialog #confirmDialog class="confirm" (close)="removing.set(null)">
      @if (removing(); as d) {
        <h2>Remove {{ d.name }}?</h2>
        <p>
          It disappears from the website’s dealers page straight away. This can’t be undone (you can
          add it again).
        </p>
        <div class="actions">
          <button type="button" class="btn btn--danger" [disabled]="busy()" (click)="remove(d)">
            Remove
          </button>
          <button type="button" class="btn btn--ghost" (click)="confirmDialog.close()">Keep</button>
        </div>
      }
    </dialog>
  `,
})
export class DealersAdmin {
  private readonly api = inject(AdminApi);
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('confirmDialog');
  private readonly formEl = viewChild<ElementRef<HTMLFormElement>>('formEl');

  readonly dealers = signal<AdminDealer[]>([]);
  readonly regions = signal<Region[]>([]);
  readonly loading = signal(true);
  readonly error = signal('');
  readonly notice = signal('');
  readonly query = signal('');
  readonly regionFilter = signal('');
  readonly form = signal<DealerInput | null>(null);
  readonly editingId = signal('');
  readonly editingName = signal('');
  readonly formError = signal('');
  readonly busy = signal(false);
  readonly removing = signal<AdminDealer | null>(null);
  readonly savedId = signal('');

  readonly shown = computed(() => {
    const q = this.query().trim().toLowerCase();
    const region = this.regionFilter();
    return this.dealers().filter(
      (d) =>
        (!region || d.region === region) &&
        (!q ||
          `${d.name} ${d.address} ${d.phone} ${this.regionName(d.region)}`
            .toLowerCase()
            .includes(q)),
    );
  });

  constructor() {
    void this.load();
  }

  private async load(): Promise<void> {
    try {
      const [regions, dealers] = await Promise.all([this.api.regions(), this.api.dealers()]);
      this.regions.set(regions);
      this.dealers.set(dealers);
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.loading.set(false);
    }
  }

  regionName(id: string): string {
    return this.regions().find((r) => r.id === id)?.name ?? id;
  }

  countIn(id: string): number {
    return this.dealers().filter((d) => d.region === id).length;
  }

  startAdd(): void {
    this.openForm('', { ...EMPTY, region: this.regionFilter() });
  }

  startEdit(d: AdminDealer): void {
    this.openForm(d.id, { name: d.name, region: d.region, phone: d.phone, address: d.address });
    this.editingName.set(d.name);
  }

  private openForm(id: string, value: DealerInput): void {
    this.editingId.set(id);
    this.form.set(value);
    this.formError.set('');
    this.notice.set('');
    setTimeout(() => {
      const el = this.formEl()?.nativeElement;
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      el?.querySelector('input')?.focus({ preventScroll: true });
    });
  }

  closeForm(): void {
    this.form.set(null);
    this.editingId.set('');
  }

  async save(): Promise<void> {
    const value = this.form();
    if (!value || this.busy()) return;
    this.busy.set(true);
    this.formError.set('');
    try {
      const id = this.editingId();
      const saved = id ? await this.api.saveDealer(id, value) : await this.api.addDealer(value);
      this.dealers.update((list) =>
        (id ? list.map((d) => (d.id === id ? saved : d)) : [...list, saved]).sort((a, b) =>
          a.name.localeCompare(b.name, 'en', { sensitivity: 'base', numeric: true }),
        ),
      );
      this.closeForm();
      this.savedId.set(saved.id);
      this.notice.set(
        `${saved.name} ${id ? 'saved' : 'added'}. The website shows it straight away.`,
      );
    } catch (e) {
      this.formError.set((e as Error).message);
    } finally {
      this.busy.set(false);
    }
  }

  askRemove(d: AdminDealer): void {
    this.removing.set(d);
    this.dialog().nativeElement.showModal();
  }

  async remove(d: AdminDealer): Promise<void> {
    this.busy.set(true);
    try {
      await this.api.removeDealer(d.id);
      this.dealers.update((list) => list.filter((x) => x.id !== d.id));
      if (this.editingId() === d.id) this.closeForm();
      this.notice.set(`${d.name} removed from the website.`);
      this.error.set('');
    } catch (e) {
      this.error.set((e as Error).message);
    } finally {
      this.busy.set(false);
      this.dialog().nativeElement.close();
    }
  }
}
