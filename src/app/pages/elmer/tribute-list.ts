import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TRIBUTES, Tribute } from '../../data/tributes';
import { TributeDialog } from '../../shared/tribute-dialog/tribute-dialog';

/** Names of everyone who sent a tribute; each opens the full message in a dialog. */
@Component({
  selector: 'app-tribute-list',
  imports: [TributeDialog],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul class="tributes" role="list">
      @for (tribute of tributes; track tribute.id) {
        <li>
          <button
            type="button"
            class="tributes__open"
            aria-haspopup="dialog"
            (click)="selected.set(tribute)"
          >
            {{ tribute.author }}
          </button>
        </li>
      }
    </ul>
    <app-tribute-dialog [tribute]="selected()" (closed)="selected.set(null)" />
  `,
  styles: `
    .tributes {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
      gap: var(--space-2);
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .tributes__open {
      inline-size: 100%;
      padding: var(--space-3);
      border: 1px solid var(--color-border);
      border-inline-start: 4px solid var(--color-accent);
      border-radius: var(--radius);
      background: var(--color-bg);
      color: var(--color-text);
      font: inherit;
      text-align: start;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .tributes__open:hover {
      background: var(--color-surface);
    }
  `,
})
export class TributeList {
  protected readonly tributes = TRIBUTES;
  protected readonly selected = signal<Tribute | null>(null);
}
