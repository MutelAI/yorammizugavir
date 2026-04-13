import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { I18nService } from '../services/i18n.service';
import { BusinessDataService } from '../services/business-data.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  template: `
    <style>
      @keyframes sidebarSlide {
        from { opacity: 0; transform: translateX(30px); }
        to { opacity: 1; transform: translateX(0); }
      }
      @keyframes gridFade {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
      }
      .sidebar-slide { animation: sidebarSlide 0.6s ease-out both; }
      .grid-fade { animation: gridFade 0.5s ease-out both; }
      .grid-fade:nth-child(2) { animation-delay: 0.1s; }
      .grid-fade:nth-child(3) { animation-delay: 0.2s; }
    </style>
    <section id="contact" class="py-20 bg-white" [attr.dir]="i18n.dir()">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-14" data-animate>
          <h2 class="text-4xl font-bold text-gray-900 mb-4">{{ i18n.t()('contact_title') }}</h2>
          <p class="text-lg text-gray-500">{{ i18n.t()('contact_subtitle') }}</p>
        </div>
        @if (submitted()) {
          <div class="text-center py-16" data-animate>
            <div class="text-5xl mb-5">✅</div>
            <h3 class="text-2xl font-bold text-emerald-700 mb-2">{{ i18n.t()('contact_thanks_title') }}</h3>
            <p class="text-gray-600">{{ i18n.t()('contact_thanks_desc') }}</p>
          </div>
        } @else {
          <div class="grid lg:grid-cols-3 gap-8" data-animate>
            <!-- Contact info grid (2 cols) -->
            <div class="lg:col-span-2 grid sm:grid-cols-2 gap-5">
              @if (biz.business()?.phone_display) {
                <div class="grid-fade bg-emerald-50 rounded-2xl p-6">
                  <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-2xl mb-4">📞</div>
                  <h4 class="font-bold text-gray-900 mb-1">{{ i18n.t()('contact_call') }}</h4>
                  <p class="text-gray-500 text-sm mb-3">{{ biz.business()?.phone_display }}</p>
                  <a [href]="'tel:' + biz.business()?.phone" class="inline-block text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors">
                    {{ i18n.t()('contact_call') }} →
                  </a>
                </div>
              }
              @if (biz.business()?.whatsapp) {
                <div class="grid-fade bg-teal-50 rounded-2xl p-6">
                  <div class="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-2xl mb-4">💬</div>
                  <h4 class="font-bold text-gray-900 mb-1">{{ i18n.t()('contact_whatsapp') }}</h4>
                  <p class="text-gray-500 text-sm mb-3">{{ biz.business()?.whatsapp }}</p>
                  <a [href]="waUrl()" target="_blank" class="inline-block text-teal-600 hover:text-teal-700 text-sm font-medium transition-colors">
                    {{ i18n.t()('contact_whatsapp') }} →
                  </a>
                </div>
              }
              @if (biz.business()?.address_he || biz.business()?.address_en) {
                <div class="grid-fade bg-gray-50 rounded-2xl p-6 sm:col-span-2">
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl shrink-0">📍</div>
                    <div>
                      <h4 class="font-bold text-gray-900 mb-1">{{ i18n.t()('contact_address') }}</h4>
                      <p class="text-gray-500 text-sm mb-2">{{ i18n.isPrimary() ? biz.business()?.address_he : biz.business()?.address_en }}</p>
                      <a [href]="biz.business()?.maps_url" target="_blank" class="inline-block text-emerald-600 hover:text-emerald-700 text-sm font-medium transition-colors">
                        {{ i18n.t()('contact_address') }} →
                      </a>
                    </div>
                  </div>
                </div>
              }
            </div>
            <!-- Sidebar form (1 col) -->
            <div class="sidebar-slide">
              <div class="bg-emerald-600 rounded-2xl p-7 h-full flex flex-col">
                <h3 class="text-xl font-bold text-white mb-6">{{ i18n.t()('contact_form_title') }}</h3>
                <form (ngSubmit)="onSubmit()" class="flex-1 flex flex-col space-y-4">
                  <input [(ngModel)]="formData.name" name="name" type="text" [placeholder]="i18n.t()('contact_name_placeholder')" class="w-full px-4 py-3 bg-emerald-500 bg-opacity-50 border border-emerald-400 border-opacity-30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent" />
                  <input [(ngModel)]="formData.phone" name="phone" type="tel" [placeholder]="i18n.t()('contact_phone_placeholder')" class="w-full px-4 py-3 bg-emerald-500 bg-opacity-50 border border-emerald-400 border-opacity-30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent" />
                  <textarea [(ngModel)]="formData.message" name="message" rows="4" [placeholder]="i18n.t()('contact_message_placeholder')" class="flex-1 w-full px-4 py-3 bg-emerald-500 bg-opacity-50 border border-emerald-400 border-opacity-30 rounded-xl text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent resize-none"></textarea>
                  <button type="submit" class="w-full bg-white hover:bg-gray-100 text-emerald-700 font-bold py-3 rounded-xl transition-colors mt-auto">
                    {{ i18n.t()('contact_submit') }}
                  </button>
                </form>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `
})
export class ContactComponent {
  protected i18n = inject(I18nService);
  protected biz = inject(BusinessDataService);
  protected submitted = signal(false);
  protected formData = { name: '', phone: '', message: '' };

  waUrl(): string {
    const b = this.biz.business();
    if (!b?.whatsapp) return '';
    const phone = (b.whatsapp ?? '').replace(/\D/g, '');
    return `https://wa.me/${phone}`;
  }

  onSubmit(): void {
    const b = this.biz.business();
    if (!b?.whatsapp) return;
    const phone = (b.whatsapp ?? '').replace(/\D/g, '');
    const t = this.i18n.t();
    const message = `${t('contact_wa_intro')} ${this.formData.name}.
${t('contact_wa_phone_label')} ${this.formData.phone}
${t('contact_wa_message_label')} ${this.formData.message || t('contact_wa_default_msg')}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    this.submitted.set(true);
  }
}
