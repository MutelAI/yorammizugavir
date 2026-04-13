import { Component, inject } from '@angular/core';
import { I18nService } from '../services/i18n.service';
import { BusinessDataService } from '../services/business-data.service';

/**
 * About Variant G — "Parallax Layers"
 * Offset layered panels with depth effect and staggered animations.
 */
@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <style>
      .plx-layer {
        opacity: 0;
        transform: translateY(40px);
        animation: plxRise 0.7s ease forwards;
      }
      .plx-layer:nth-child(1) { animation-delay: 0s; }
      .plx-layer:nth-child(2) { animation-delay: 0.2s; }
      .plx-layer:nth-child(3) { animation-delay: 0.4s; }
      @keyframes plxRise {
        to { opacity: 1; transform: translateY(0); }
      }
      .plx-offset-1 { transform: translateX(-20px); animation: plxSlide1 0.8s ease forwards; opacity: 0; }
      .plx-offset-2 { transform: translateX(20px); animation: plxSlide2 0.8s ease 0.2s forwards; opacity: 0; }
      @keyframes plxSlide1 { to { transform: translateX(0); opacity: 1; } }
      @keyframes plxSlide2 { to { transform: translateX(0); opacity: 1; } }
      .plx-float {
        animation: plxFloat 4s ease-in-out infinite;
      }
      @keyframes plxFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
      }
      .plx-bg-shape {
        position: absolute;
        border-radius: 50%;
        opacity: 0.05;
        background: #3b82f6;
      }
    </style>
    <section id="about" class="py-24 bg-gray-50 relative overflow-hidden" [attr.dir]="i18n.dir()">
      <!-- Background shapes for depth -->
      <div class="plx-bg-shape w-96 h-96" style="top:-100px;right:-80px;"></div>
      <div class="plx-bg-shape w-64 h-64" style="bottom:-50px;left:-40px;"></div>

      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <!-- Title layer -->
        <div class="plx-layer text-center mb-16" data-animate>
          <span class="text-6xl plx-float inline-block mb-4">{{ biz.business()?.logo_emoji || '🏢' }}</span>
          <h2 class="text-4xl md:text-5xl font-black text-gray-900">
            {{ i18n.t()('about_title') }}
          </h2>
          <div class="w-20 h-1 bg-emerald-500 rounded-full mx-auto mt-4"></div>
        </div>

        <!-- Offset panels -->
        <div class="grid md:grid-cols-2 gap-6 mb-12">
          <!-- Description panel — offset left -->
          <div class="plx-offset-1 bg-white rounded-3xl p-8 shadow-lg border border-gray-100 md:-translate-y-4" data-animate>
            <p class="text-gray-600 text-lg leading-relaxed">
              {{ i18n.t()('about_desc') }}
            </p>
          </div>

          <!-- Stats panel — offset right -->
          <div class="plx-offset-2 bg-emerald-600 rounded-3xl p-8 shadow-lg text-white md:translate-y-4" data-animate>
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center">
                <div class="text-4xl font-black">⭐ {{ biz.business()?.rating }}</div>
                <p class="text-white/70 text-sm mt-2">{{ i18n.t()('about_rating_label') }}</p>
              </div>
              <div class="text-center">
                <div class="text-4xl font-black">{{ biz.business()?.reviews_count }}+</div>
                <p class="text-white/70 text-sm mt-2">{{ i18n.t()('about_reviews_label') }}</p>
              </div>
              <div class="text-center">
                <div class="text-3xl font-black">🏆 {{ i18n.t()('about_years_value') }}</div>
                <p class="text-white/70 text-sm mt-2">{{ i18n.t()('about_years_label') }}</p>
              </div>
              <div class="text-center">
                <div class="text-3xl font-black">⚡ 24/7</div>
                <p class="text-white/70 text-sm mt-2">{{ i18n.t()('about_available_label') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Third layer: Hours — floating panel -->
        @if (biz.hours().length) {
          <div class="plx-layer max-w-2xl mx-auto" data-animate>
            <div class="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative -mt-2">
              <h3 class="font-bold text-gray-800 mb-5 text-lg flex items-center gap-2">
                🕐 {{ i18n.t()('hours_title') }}
              </h3>
              <div class="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                @for (h of biz.hours(); track h.day_key) {
                  <div class="flex justify-between py-2 border-b border-gray-50">
                    <span class="font-medium text-gray-600">{{ i18n.isPrimary() ? h.day_he : h.day_en }}</span>
                    <span [class]="h.is_open ? 'text-green-600 font-semibold' : 'text-red-400'">
                      {{ i18n.isPrimary() ? h.hours_he : h.hours_en }}
                    </span>
                  </div>
                }
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
})
export class AboutComponent {
  protected i18n = inject(I18nService);
  protected biz = inject(BusinessDataService);
}
