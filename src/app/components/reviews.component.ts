import { Component, inject, signal } from '@angular/core';
import { I18nService } from '../services/i18n.service';
import { BusinessDataService } from '../services/business-data.service';

/**
 * Reviews Variant I — "Timeline"
 * Reviews placed on a vertical timeline with alternating
 * left/right sides, connected by a central line and dots.
 */
@Component({
  selector: 'app-reviews',
  standalone: true,
  template: `
    <section id="reviews" class="py-20 bg-gray-50" [attr.dir]="i18n.dir()">
      <style>
        @keyframes slide-start {
          from { opacity: 0; transform: translateX(-60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-end {
          from { opacity: 0; transform: translateX(60px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .tl-start { animation: slide-start 0.6s ease-out both; }
        .tl-end   { animation: slide-end 0.6s ease-out both; }
        .timeline-line {
          position: absolute;
          inset-inline-start: 50%;
          top: 0; bottom: 0;
          width: 3px;
          background: linear-gradient(to bottom, #3b82f6, #0ea5e9);
          transform: translateX(-50%);
        }
        @media (max-width: 767px) {
          .timeline-line { inset-inline-start: 20px; }
        }
      </style>

      <div class="max-w-5xl mx-auto px-6">
        <div class="text-center mb-14" data-animate>
          <h2 class="text-4xl font-black text-gray-900 mb-2">{{ i18n.t()('reviews_title') }}</h2>
          <p class="text-gray-500 text-lg">{{ i18n.t()('reviews_subtitle') }}</p>
          @if (biz.business(); as b) {
            <div class="inline-flex items-center gap-3 mt-5 bg-white px-6 py-3 rounded-full shadow-sm">
              <span class="text-3xl font-black text-emerald-700">{{ b.rating }}</span>
              <div class="flex gap-0.5 text-yellow-400 text-xl">
                @for (s of stars(b.rating); track $index) {<span>{{ s }}</span>}
              </div>
              <span class="text-sm text-gray-400">{{ b.reviews_count }} {{ i18n.t()('reviews_reviews') }}</span>
            </div>
          }
        </div>

        <!-- Timeline -->
        <div class="relative">
          <div class="timeline-line"></div>

          @for (review of visibleReviews(); track review.author; let idx = $index; let odd = $odd) {
            <div class="relative flex mb-10"
                 [class.md:justify-start]="!odd"
                 [class.md:justify-end]="odd"
                 data-animate>
              <!-- Dot on the line -->
              <div class="absolute hidden md:block top-6 w-4 h-4 bg-emerald-600 border-4 border-white rounded-full shadow-md z-10"
                   style="inset-inline-start: calc(50% - 8px)"></div>
              <!-- Mobile dot -->
              <div class="absolute md:hidden top-6 w-4 h-4 bg-emerald-600 border-4 border-white rounded-full shadow-md z-10"
                   style="inset-inline-start: 13px"></div>

              <div class="ms-12 md:ms-0 md:w-[45%] bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                   [class.tl-start]="!odd"
                   [class.tl-end]="odd"
                   [style.animation-delay]="idx * 120 + 'ms'">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-10 h-10 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {{ review.author.charAt(0) }}
                  </div>
                  <div>
                    <div class="font-bold text-gray-800 text-sm">{{ review.author }}</div>
                    <div class="flex items-center gap-2">
                      <span class="flex gap-0.5 text-yellow-400 text-xs">
                        @for (s of stars(review.rating); track $index) {<span>{{ s }}</span>}
                      </span>
                      @if (review.is_local_guide) {
                        <span class="text-xs text-emerald-500">🏅 {{ i18n.t()('reviews_local_guide') }}</span>
                      }
                    </div>
                  </div>
                  <span class="ms-auto text-xs text-gray-400">{{ review.date }}</span>
                </div>
                <p class="text-gray-600 text-sm leading-relaxed">{{ i18n.isPrimary() ? review.text_he : review.text_en }}</p>
              </div>
            </div>
          }
        </div>

        @if (showMore()) {
          <div class="text-center mt-8">
            <button (click)="loadMore()" class="bg-emerald-600 text-white font-bold px-8 py-3 rounded-full hover:bg-emerald-700 transition-colors shadow-md">
              {{ i18n.t()('reviews_load_more') }}
            </button>
          </div>
        }
      </div>
    </section>
  `,
})
export class ReviewsComponent {
  protected i18n = inject(I18nService);
  protected biz = inject(BusinessDataService);
  private visibleCount = signal(6);

  visibleReviews() {
    return this.biz.reviews().slice(0, this.visibleCount());
  }

  showMore() {
    return this.biz.reviews().length > this.visibleCount();
  }

  loadMore(): void {
    this.visibleCount.update((n) => n + 6);
  }

  stars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => (i < rating ? '★' : '☆'));
  }
}
