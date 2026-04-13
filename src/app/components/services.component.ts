import { Component, inject } from '@angular/core';
import { I18nService } from '../services/i18n.service';
import { BusinessDataService } from '../services/business-data.service';

/**
 * Services Variant B — "Numbered Steps"
 * Services displayed as numbered steps in a vertical flow with a connecting line.
 * Clean, process-oriented layout.
 */
@Component({
  selector: 'app-services',
  standalone: true,
  template: `
    <section id="services" class="py-20 bg-gray-50" [attr.dir]="i18n.dir()">
      <div class="max-w-4xl mx-auto px-6">
        <!-- Header -->
        <div class="text-center mb-16" data-animate>
          <h2 class="text-4xl font-black text-gray-900 mb-3">
            {{ i18n.t()('services_title') }}
          </h2>
          <p class="text-gray-500 text-lg">{{ i18n.t()('services_subtitle') }}</p>
        </div>

        <!-- Numbered steps -->
        <div class="relative">
          <!-- Connecting line -->
          <div class="absolute start-8 md:start-1/2 top-0 bottom-0 w-0.5 bg-emerald-200 -translate-x-1/2 hidden md:block"></div>

          @for (svc of biz.services(); track svc.id; let i = $index; let even = $even) {
            <div class="relative mb-12 last:mb-0" data-animate>
              <!-- Step number circle -->
              <div class="hidden md:flex absolute start-1/2 -translate-x-1/2 w-12 h-12 bg-emerald-600 text-white font-black text-lg rounded-full items-center justify-center z-10 shadow-lg shadow-emerald-200">
                {{ i + 1 }}
              </div>

              <!-- Card — alternates sides on desktop -->
              <div [class]="'md:w-[calc(50%-2rem)] bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow ' + (even ? 'md:me-auto' : 'md:ms-auto')">
                <div class="flex items-start gap-4">
                  <!-- Mobile step number -->
                  <div class="md:hidden shrink-0 w-10 h-10 bg-emerald-600 text-white font-bold text-sm rounded-full flex items-center justify-center">
                    {{ i + 1 }}
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="text-2xl">{{ svc.icon }}</span>
                      <h3 class="font-bold text-gray-900 text-lg">
                        {{ i18n.isPrimary() ? svc.title_he : svc.title_en }}
                      </h3>
                    </div>
                    <p class="text-gray-500 text-sm leading-relaxed">
                      {{ i18n.isPrimary() ? svc.desc_he : svc.desc_en }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        <!-- CTA -->
        <div class="mt-16 text-center" data-animate>
          <a href="#contact" (click)="scrollTo($event)"
            class="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-700 hover:scale-105 transition-all duration-200 shadow-lg shadow-emerald-200">
            🛠️ {{ i18n.t()('services_cta') }}
          </a>
        </div>
      </div>
    </section>
  `,
})
export class ServicesComponent {
  protected i18n = inject(I18nService);
  protected biz = inject(BusinessDataService);

  scrollTo(e: Event): void {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}
