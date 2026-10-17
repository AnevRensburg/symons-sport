import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { Tribute } from '../../data/tributes';
import { Icon } from '../icon/icon';

/**
 * Native <dialog> for a single tribute message (replaces the jQuery overlay).
 * Opens as a modal when `tribute` is set; Escape, the close button or a backdrop click closes it.
 */
@Component({
  selector: 'app-tribute-dialog',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Backdrop click is a mouse shortcut only; keyboard users close with Escape or the button. -->
    <!-- eslint-disable-next-line @angular-eslint/template/click-events-have-key-events, @angular-eslint/template/interactive-supports-focus -->
    <dialog
      #dialog
      class="dialog"
      aria-labelledby="tribute-title"
      (close)="closed.emit()"
      (click)="onBackdropClick($event)"
    >
      @if (tribute(); as t) {
        <div class="dialog__header">
          <h2 id="tribute-title" class="dialog__title">Message from {{ t.author }}</h2>
          <button type="button" class="dialog__close" (click)="dialog.close()">
            <app-icon name="close" />
            <span class="visually-hidden">Close message</span>
          </button>
        </div>
        <div class="dialog__body">
          @for (paragraph of t.paragraphs; track $index) {
            <p>{{ paragraph }}</p>
          }
        </div>
      }
    </dialog>
  `,
  styles: `
    .dialog {
      inline-size: min(48rem, calc(100vw - 2rem));
      max-block-size: min(85dvh, 50rem);
      padding: 0;
      border: 4px solid var(--color-text);
      border-radius: var(--radius);
      color: var(--color-text);
    }
    .dialog::backdrop {
      background: rgb(0 0 0 / 0.6);
    }
    .dialog__header {
      position: sticky;
      inset-block-start: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-3);
      padding: var(--space-3) var(--space-4);
      border-block-end: 1px solid var(--color-border);
      background: var(--color-bg);
    }
    .dialog__title {
      margin: 0;
      font-size: 1.35rem;
    }
    .dialog__close {
      display: inline-grid;
      place-items: center;
      inline-size: 2.75rem;
      block-size: 2.75rem;
      border: 0;
      border-radius: 50%;
      background: var(--color-surface);
      color: var(--color-text);
      font-size: 1.25rem;
      cursor: pointer;
    }
    .dialog__close:hover {
      background: var(--color-border);
    }
    .dialog__body {
      padding: var(--space-4);
      line-height: 1.75;
    }
    .dialog__body p {
      white-space: pre-line;
    }
  `,
})
export class TributeDialog {
  readonly tribute = input<Tribute | null>(null);
  readonly closed = output<void>();

  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  constructor() {
    effect(() => {
      const el = this.dialog().nativeElement;
      if (this.tribute() && !el.open) el.showModal();
      if (!this.tribute() && el.open) el.close();
    });
  }

  /** Clicks on the dialog element itself (not its content) land on the backdrop. */
  protected onBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) this.dialog().nativeElement.close();
  }
}
