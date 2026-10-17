import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Icon } from '../../shared/icon/icon';

/**
 * Click-to-load YouTube embed: shows a thumbnail and a play button; the iframe (and all
 * YouTube scripts) load only after the user clicks. Uses the privacy-enhanced nocookie domain.
 */
@Component({
  selector: 'app-youtube-facade',
  imports: [NgOptimizedImage, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (playing()) {
      <iframe
        [src]="embedUrl()"
        [title]="title()"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    } @else {
      <button type="button" class="facade" (click)="playing.set(true)">
        <img [ngSrc]="thumbnail()" width="480" height="360" alt="" disableOptimizedSrcset />
        <span class="facade__play"><app-icon name="play" /></span>
        <span class="visually-hidden">Play video: {{ title() }}</span>
      </button>
    }
  `,
  styles: `
    :host {
      display: block;
      position: relative;
      aspect-ratio: 16 / 9;
      overflow: hidden;
      border-radius: 1rem;
      background: #000;
    }
    iframe,
    .facade {
      position: absolute;
      inset: 0;
      inline-size: 100%;
      block-size: 100%;
      border: 0;
    }
    .facade {
      padding: 0;
      background: #000;
      cursor: pointer;
    }
    .facade img {
      inline-size: 100%;
      block-size: 100%;
      object-fit: cover;
      opacity: 0.85;
      transition: opacity 0.2s;
    }
    .facade:hover img {
      opacity: 1;
    }
    .facade__play {
      position: absolute;
      inset-block-start: 50%;
      inset-inline-start: 50%;
      display: grid;
      place-items: center;
      inline-size: 4.5rem;
      block-size: 3.2rem;
      border-radius: 0.9rem;
      background: var(--color-accent);
      color: #fff;
      font-size: 1.6rem;
      transform: translate(-50%, -50%);
    }
  `,
})
export class YoutubeFacade {
  readonly videoId = input.required<string>();
  readonly title = input.required<string>();

  protected readonly playing = signal(false);
  protected readonly thumbnail = computed(
    () => `https://i.ytimg.com/vi/${this.videoId()}/hqdefault.jpg`,
  );
  private readonly sanitizer = inject(DomSanitizer);
  /** Built only from the hard-coded video id, so it is safe to trust as a resource URL. */
  protected readonly embedUrl = computed(() =>
    this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId())}?autoplay=1&rel=0`,
    ),
  );
}
