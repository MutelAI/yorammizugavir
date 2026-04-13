import { Component, inject } from '@angular/core';
import { I18nService } from '../services/i18n.service';
import { BusinessDataService } from '../services/business-data.service';

/**
 * Hero Variant K — "Stacked Cards"
 * Content presented in stacked overlapping card layers.
 * Playful depth effect with perspective transform.
 */
@Component({
  selector: 'app-hero',
  standalone: true,
  template: `
    <section id="hero" class="relative overflow-hidden bg-gradient-to-b from-teal-100 to-white min-h-screen flex items-center justify-center" [attr.dir]="i18n.dir()">
      <style>
        .card-stack { animation: cardPop 0.6s ease-out both; }
        @keyframes cardPop { from { opacity:0; transform:translateY(40px) rotateX(5deg); } to { opacity:1; transform:translateY(0) rotateX(0); } }
      </style>

      <div class="relative z-10 w-full max-w-lg mx-auto px-6 py-32" style="perspective:1000px">
        <!-- Background card (decorative) -->
        <div class="card-stack absolute inset-4 bg-emerald-100 rounded-3xl -rotate-3 shadow-lg" style="animation-delay:0s"></div>
        <div class="card-stack absolute inset-4 bg-emerald-200 rounded-3xl rotate-2 shadow-lg" style="animation-delay:0.1s"></div>

        <!-- Main card -->
        <div class="card-stack relative bg-white rounded-3xl shadow-2xl p-10 md:p-12 text-center border border-gray-100" style="animation-delay:0.2s">
          <div class="text-6xl mb-4">{{ biz.business()?.logo_emoji || '🏢' }}</div>

          <div class="text-emerald-500 text-xs font-mono uppercase tracking-[0.2em] mb-3">
            {{ i18n.isPrimary() ? biz.business()?.category_he : biz.business()?.category_en }}
          </div>

          <h1 class="text-3xl md:text-4xl font-black text-emerald-900 leading-tight mb-4">
            {{ i18n.isPrimary() ? biz.business()?.name : biz.business()?.name_en }}
          </h1>

          <p class="text-gray-500 mb-6 leading-relaxed">
            {{ i18n.t()('hero_subtitle') }}
          </p>

          <div class="inline-block bg-teal-50 text-teal-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
            {{ i18n.t()('hero_badge') }}
          </div>

          @if (biz.business(); as b) {
            <div class="flex items-center justify-center gap-4 mb-8 text-sm">
              <span class="bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full font-bold">⭐ {{ b.rating }}</span>
              <span class="bg-gray-50 text-gray-600 px-3 py-1 rounded-full">{{ b.reviews_count }}+ {{ i18n.t()('reviews_happy') }}</span>
              <span class="bg-green-50 text-green-600 px-3 py-1 rounded-full">✅</span>
            </div>
          }

          <div class="space-y-3">
            <a [href]="'tel:' + biz.business()?.phone"
              class="block bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-500 hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-emerald-200">
              📞 {{ i18n.t()('hero_cta_call') }}
            </a>
            <a [href]="whatsappUrl()" target="_blank" rel="noopener"
              class="block bg-green-500 text-white font-bold py-4 rounded-2xl hover:bg-green-400 hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-green-200">
              💬 {{ i18n.t()('hero_cta_whatsapp') }}
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class HeroComponent {
  protected i18n = inject(I18nService);
  protected biz = inject(BusinessDataService);

  whatsappUrl() {
    const phone = this.biz.business()?.whatsapp?.replace(/\D/g, '') ?? '';
    const msg = this.i18n.t()('contact_wa_hello');
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }
}
