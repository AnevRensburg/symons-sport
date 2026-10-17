import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Picture } from '../../shared/picture/picture';
import { TributeList } from './tribute-list';
import { YoutubeFacade } from './youtube-facade';

@Component({
  selector: 'app-elmer',
  imports: [Picture, TributeList, YoutubeFacade],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="page container">
      <h1>Elmer Symons</h1>

      <div class="intro">
        <p class="prose">
          Elmer Symons was a motorcycle enduro racer. He was born in KwaZulu-Natal, South Africa. He
          began enduro racing in 1996 and moved to the United States in 2003. He had placed well in
          numerous regional competitions and had participated in the 2005 and 2006 Dakar Rally as a
          support mechanic. Together with his brother Philip he started Symons Sport International
          in 2003.
        </p>
        <div class="photos">
          <app-picture
            class="photos__action"
            src="elmer/elmer-racing"
            alt="Elmer Symons racing his off-road motorcycle"
            sizes="(min-width: 64em) 460px, 60vw"
          />
          <app-picture
            class="photos__portrait"
            src="elmer/elmer-portrait"
            alt="Portrait of Elmer Symons"
            sizes="(min-width: 64em) 180px, 35vw"
          />
        </div>
      </div>

      <section class="section" aria-labelledby="video-title">
        <h2 id="video-title">View Elmer in action</h2>
        @defer (on viewport; hydrate on interaction) {
          <app-youtube-facade class="video" videoId="06eL79XSmBk" title="Elmer Symons riding" />
        } @placeholder {
          <div class="video video--placeholder"></div>
        }
      </section>

      <section class="section" aria-labelledby="tributes-title">
        <h2 id="tributes-title">Tributes to Elmer</h2>
        <p class="prose">Messages from friends, fellow riders and fans around the world.</p>
        @defer (on viewport; hydrate on interaction) {
          <app-tribute-list />
        } @placeholder {
          <div class="tributes-placeholder"></div>
        }
        <p class="more">
          <a href="/docs/elmers-messages.pdf">View more messages for Elmer</a>
          <span class="more__meta">(PDF, 415 kB)</span>
        </p>
      </section>
    </article>
  `,
  styles: `
    .intro {
      display: grid;
      gap: var(--space-4);
      align-items: start;
    }
    .photos {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: var(--space-3);
      align-items: start;
    }
    .photos app-picture {
      overflow: hidden;
      border-radius: var(--radius);
    }
    .section {
      margin-block-start: var(--space-6);
    }
    .video {
      display: block;
      max-inline-size: 48rem;
    }
    .video--placeholder {
      aspect-ratio: 16 / 9;
      border-radius: 1rem;
      background: #000;
    }
    .tributes-placeholder {
      min-block-size: 24rem;
    }
    .more {
      margin-block-start: var(--space-4);
    }
    .more__meta {
      color: var(--color-muted);
      font-size: 0.9rem;
    }
    @media (min-width: 64em) {
      .intro {
        grid-template-columns: 1fr 40rem;
      }
    }
  `,
})
export class Elmer {}
