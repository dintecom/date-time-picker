import { Component, signal, Injectable, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe, registerLocaleData } from '@angular/common';
import localeAr from '@angular/common/locales/ar';
import localeFr from '@angular/common/locales/fr';
import localeDe from '@angular/common/locales/de';
import localeEs from '@angular/common/locales/es';
import localeJa from '@angular/common/locales/ja';
import {
  OwlDateTimeComponent,
  OwlDateTimeTriggerDirective,
  OwlDateTimeInputDirective,
  OwlDateTimeInlineComponent,
  OwlDateTimeIntl,
  DateTimeAdapter
} from '../../../projects/picker/src/public-api';

// Register locales
registerLocaleData(localeAr, 'ar');
registerLocaleData(localeFr, 'fr');
registerLocaleData(localeDe, 'de');
registerLocaleData(localeEs, 'es');
registerLocaleData(localeJa, 'ja');

// Arabic Labels
@Injectable()
export class ArabicIntl extends OwlDateTimeIntl {
  override cancelBtnLabel = 'إلغاء';
  override setBtnLabel = 'تعيين';
  override rangeFromLabel = 'من';
  override rangeToLabel = 'إلى';
  override hour12AMLabel = 'ص';
  override hour12PMLabel = 'م';
  override prevMonthLabel = 'الشهر السابق';
  override nextMonthLabel = 'الشهر القادم';
  override prevYearLabel = 'السنة السابقة';
  override nextYearLabel = 'السنة القادمة';
  override switchToMonthViewLabel = 'التغيير إلى عرض الشهر';
  override switchToMultiYearViewLabel = 'اختر الشهر والسنة';
}

// French Labels
@Injectable()
export class FrenchIntl extends OwlDateTimeIntl {
  override cancelBtnLabel = 'Annuler';
  override setBtnLabel = 'Valider';
  override rangeFromLabel = 'De';
  override rangeToLabel = 'À';
  override hour12AMLabel = 'AM';
  override hour12PMLabel = 'PM';
  override prevMonthLabel = 'Mois précédent';
  override nextMonthLabel = 'Mois suivant';
  override prevYearLabel = 'Année précédente';
  override nextYearLabel = 'Année suivante';
  override switchToMonthViewLabel = 'Passer à la vue du mois';
  override switchToMultiYearViewLabel = 'Choisir le mois et l\'année';
}

// German Labels
@Injectable()
export class GermanIntl extends OwlDateTimeIntl {
  override cancelBtnLabel = 'Abbrechen';
  override setBtnLabel = 'Bestätigen';
  override rangeFromLabel = 'Von';
  override rangeToLabel = 'Bis';
  override hour12AMLabel = 'AM';
  override hour12PMLabel = 'PM';
  override prevMonthLabel = 'Vorheriger Monat';
  override nextMonthLabel = 'Nächster Monat';
  override prevYearLabel = 'Vorheriges Jahr';
  override nextYearLabel = 'Nächstes Jahr';
  override switchToMonthViewLabel = 'Zur Monatsansicht wechseln';
  override switchToMultiYearViewLabel = 'Monat und Jahr wählen';
}

// Spanish Labels
@Injectable()
export class SpanishIntl extends OwlDateTimeIntl {
  override cancelBtnLabel = 'Cancelar';
  override setBtnLabel = 'Aceptar';
  override rangeFromLabel = 'Desde';
  override rangeToLabel = 'Hasta';
  override hour12AMLabel = 'AM';
  override hour12PMLabel = 'PM';
  override prevMonthLabel = 'Mes anterior';
  override nextMonthLabel = 'Mes siguiente';
  override prevYearLabel = 'Año anterior';
  override nextYearLabel = 'Año siguiente';
  override switchToMonthViewLabel = 'Cambiar a vista de mes';
  override switchToMultiYearViewLabel = 'Elegir mes y año';
}

// Japanese Labels
@Injectable()
export class JapaneseIntl extends OwlDateTimeIntl {
  override cancelBtnLabel = 'キャンセル';
  override setBtnLabel = '設定';
  override rangeFromLabel = '開始';
  override rangeToLabel = '終了';
  override hour12AMLabel = '午前';
  override hour12PMLabel = '午後';
  override prevMonthLabel = '前月';
  override nextMonthLabel = '次月';
  override prevYearLabel = '前年';
  override nextYearLabel = '次年';
  override switchToMonthViewLabel = '月表示に切り替え';
  override switchToMultiYearViewLabel = '月と年を選択';
}

interface LocaleOption {
  code: string;
  name: string;
  flag: string;
  direction: 'ltr' | 'rtl';
  intl: typeof OwlDateTimeIntl;
}

/**
 * Localization & Internationalization Demo
 * Demonstrates multi-language support with RTL languages (Arabic)
 */
@Component({
  selector: 'app-localization',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    OwlDateTimeComponent,
    OwlDateTimeTriggerDirective,
    OwlDateTimeInputDirective,
    OwlDateTimeInlineComponent
  ],
  providers: [
    ArabicIntl,
    FrenchIntl,
    GermanIntl,
    SpanishIntl,
    JapaneseIntl
  ],
  template: `
    <div class="demo-container">
      <h2>Localization & Internationalization</h2>
      <p class="description">Multi-language support with translated labels and RTL (Right-to-Left) languages.</p>

      <!-- Locale Selector -->
      <section class="demo-section locale-selector">
        <h3>🌍 Select Language</h3>
        <div class="locale-grid">
          @for (locale of locales; track locale.code) {
            <button
              class="locale-button"
              [class.active]="currentLocale() === locale.code"
              (click)="changeLocale(locale.code)">
              <span class="locale-flag">{{ locale.flag }}</span>
              <span class="locale-name">{{ locale.name }}</span>
              @if (locale.direction === 'rtl') {
                <span class="rtl-badge">RTL</span>
              }
            </button>
          }
        </div>
        <div class="current-locale-info">
          <strong>Current Locale:</strong> {{ currentLocale() }}
          <span class="separator">|</span>
          <strong>Direction:</strong> {{ getCurrentDirection() }}
        </div>
      </section>

      <!-- Localized Picker Example -->
      <section class="demo-section" [class.rtl]="getCurrentDirection() === 'rtl'">
        <h3>{{ getCurrentLocaleName() }} - Localized Picker</h3>
        <p class="hint" [dir]="getCurrentDirection()">
          @if (currentLocale() === 'ar') {
            انقر لفتح التقويم مع التسميات المترجمة (إلغاء، تعيين، من، إلى، إلخ)
          } @else if (currentLocale() === 'fr') {
            Cliquez pour ouvrir le calendrier avec les libellés traduits (Annuler, Valider, De, À, etc.)
          } @else if (currentLocale() === 'de') {
            Klicken Sie, um den Kalender mit übersetzten Beschriftungen zu öffnen (Abbrechen, Bestätigen, Von, Bis usw.)
          } @else if (currentLocale() === 'es') {
            Haga clic para abrir el calendario con etiquetas traducidas (Cancelar, Aceptar, Desde, Hasta, etc.)
          } @else if (currentLocale() === 'ja') {
            翻訳されたラベルでカレンダーを開くにはクリックしてください（キャンセル、設定、開始、終了など）
          } @else {
            Click to open calendar with translated labels (Cancel, Set, From, To, etc.)
          }
        </p>
        <div class="input-group" [dir]="getCurrentDirection()">
          <label [dir]="getCurrentDirection()">
            {{ getDateLabel() }}
          </label>
          <input
            [(ngModel)]="localizedDate"
            [owlDateTime]="dt1"
            [owlDateTimeTrigger]="dt1"
            [dir]="getCurrentDirection()"
            [placeholder]="getPlaceholder()">
          <owl-date-time #dt1></owl-date-time>
          @if (localizedDate()) {
            <div class="selected-value" [dir]="getCurrentDirection()">
              <strong>{{ getSelectedLabel() }}</strong>
              {{ localizedDate() | date:'full':'+0000':currentLocale() }}
            </div>
          }
        </div>
      </section>

      <!-- Range Picker with Localized Labels -->
      <section class="demo-section" [class.rtl]="getCurrentDirection() === 'rtl'">
        <h3>📊 Range Picker - Localized "From" & "To" Labels</h3>
        <p class="hint" [dir]="getCurrentDirection()">
          {{ getRangeHint() }}
        </p>
        <div class="input-group" [dir]="getCurrentDirection()">
          <label [dir]="getCurrentDirection()">
            {{ getRangeLabel() }}
          </label>
          <input
            [(ngModel)]="rangeDate"
            [selectMode]="'range'"
            [owlDateTime]="dt2"
            [owlDateTimeTrigger]="dt2"
            [dir]="getCurrentDirection()"
            [placeholder]="getRangePlaceholder()">
          <owl-date-time #dt2></owl-date-time>
          @if (rangeDate() && rangeDate()[0]) {
            <div class="range-result" [dir]="getCurrentDirection()">
              <div class="range-item">
                <span class="range-label">{{ getFromLabel() }}</span>
                <span class="range-value">{{ rangeDate()[0] | date:'medium':'+0000':currentLocale() }}</span>
              </div>
              @if (rangeDate()[1]) {
                <div class="range-item">
                  <span class="range-label">{{ getToLabel() }}</span>
                  <span class="range-value">{{ rangeDate()[1] | date:'medium':'+0000':currentLocale() }}</span>
                </div>
              }
            </div>
          }
        </div>
      </section>

      <!-- DateTime with 12-hour format -->
      <section class="demo-section" [class.rtl]="getCurrentDirection() === 'rtl'">
        <h3>⏰ DateTime - Localized AM/PM Labels</h3>
        <p class="hint" [dir]="getCurrentDirection()">
          {{ getTimeHint() }}
        </p>
        <div class="input-group" [dir]="getCurrentDirection()">
          <label [dir]="getCurrentDirection()">
            {{ getDateTimeLabel() }}
          </label>
          <input
            [(ngModel)]="dateTimeValue"
            [owlDateTime]="dt3"
            [owlDateTimeTrigger]="dt3"
            [dir]="getCurrentDirection()"
            [placeholder]="getDateTimePlaceholder()">
          <owl-date-time
            #dt3
            [pickerType]="'both'"
            [hour12Timer]="true">
          </owl-date-time>
          @if (dateTimeValue()) {
            <div class="selected-value" [dir]="getCurrentDirection()">
              <strong>{{ getSelectedLabel() }}</strong>
              {{ dateTimeValue() | date:'full':'+0000':currentLocale() }}
            </div>
          }
        </div>
      </section>

      <!-- Inline Calendar Comparison -->
      <section class="demo-section">
        <h3>📅 Inline Calendar Comparison</h3>
        <div class="inline-comparison">
          <div class="inline-card">
            <h4>🇺🇸 English</h4>
            <owl-date-time-inline
              [(ngModel)]="comparisonDate1"
              [pickerType]="'calendar'">
            </owl-date-time-inline>
          </div>
          <div class="inline-card">
            <h4>{{ getCurrentLocaleName() }}</h4>
            <div [dir]="getCurrentDirection()">
              <owl-date-time-inline
                [(ngModel)]="comparisonDate2"
                [pickerType]="'calendar'">
              </owl-date-time-inline>
            </div>
          </div>
        </div>
      </section>

      <!-- Label Reference Table -->
      <section class="demo-section">
        <h3>📖 Current Locale Labels (OwlDateTimeIntl)</h3>
        <div class="labels-table">
          <div class="label-row">
            <div class="label-key">Cancel Button:</div>
            <div class="label-value">{{ getCurrentIntl().cancelBtnLabel }}</div>
          </div>
          <div class="label-row">
            <div class="label-key">Set Button:</div>
            <div class="label-value">{{ getCurrentIntl().setBtnLabel }}</div>
          </div>
          <div class="label-row">
            <div class="label-key">Range From:</div>
            <div class="label-value">{{ getCurrentIntl().rangeFromLabel }}</div>
          </div>
          <div class="label-row">
            <div class="label-key">Range To:</div>
            <div class="label-value">{{ getCurrentIntl().rangeToLabel }}</div>
          </div>
          <div class="label-row">
            <div class="label-key">AM Label:</div>
            <div class="label-value">{{ getCurrentIntl().hour12AMLabel }}</div>
          </div>
          <div class="label-row">
            <div class="label-key">PM Label:</div>
            <div class="label-value">{{ getCurrentIntl().hour12PMLabel }}</div>
          </div>
          <div class="label-row">
            <div class="label-key">Previous Month:</div>
            <div class="label-value">{{ getCurrentIntl().prevMonthLabel }}</div>
          </div>
          <div class="label-row">
            <div class="label-key">Next Month:</div>
            <div class="label-value">{{ getCurrentIntl().nextMonthLabel }}</div>
          </div>
        </div>
      </section>

      <!-- Configuration Guide -->
      <section class="demo-section">
        <h3>⚙️ Configuration Guide</h3>

        <div class="config-card">
          <h4>Step 1: Create Custom Label Class</h4>
          <pre><code>import &#123; Injectable &#125; from '&#64;angular/core';
import &#123; OwlDateTimeIntl &#125; from '&#64;dintecom/ngx-datetime-picker';

&#64;Injectable()
export class FrenchIntl extends OwlDateTimeIntl &#123;
  override cancelBtnLabel = 'Annuler';
  override setBtnLabel = 'Valider';
  override rangeFromLabel = 'De';
  override rangeToLabel = 'À';
  override prevMonthLabel = 'Mois précédent';
  override nextMonthLabel = 'Mois suivant';
  // ... other labels
&#125;</code></pre>
        </div>

        <div class="config-card">
          <h4>Step 2: Provide in Component or Module</h4>
          <pre><code>// In component
&#64;Component(&#123;
  providers: [
    &#123; provide: OwlDateTimeIntl, useClass: FrenchIntl &#125;
  ]
&#125;)

// Or globally in main.ts
bootstrapApplication(AppComponent, &#123;
  providers: [
    provideOwlDateTime(),
    provideOwlNativeDateTime(),
    &#123; provide: OwlDateTimeIntl, useClass: FrenchIntl &#125;
  ]
&#125;);</code></pre>
        </div>

        <div class="config-card">
          <h4>Step 3: Register Angular Locales</h4>
          <pre><code>import &#123; registerLocaleData &#125; from '&#64;angular/common';
import localeFr from '&#64;angular/common/locales/fr';

// Register locale for DatePipe formatting
registerLocaleData(localeFr, 'fr');

// Then use 'fr' as third parameter in DatePipe
// Example: date:'full':'+0000':'fr'</code></pre>
        </div>

        <div class="config-card">
          <h4>Available Label Properties</h4>
          <div class="properties-grid">
            <div class="property-item"><code>cancelBtnLabel</code> - Cancel button text</div>
            <div class="property-item"><code>setBtnLabel</code> - Set/Confirm button text</div>
            <div class="property-item"><code>rangeFromLabel</code> - Range start label</div>
            <div class="property-item"><code>rangeToLabel</code> - Range end label</div>
            <div class="property-item"><code>hour12AMLabel</code> - AM label</div>
            <div class="property-item"><code>hour12PMLabel</code> - PM label</div>
            <div class="property-item"><code>prevMonthLabel</code> - Previous month aria-label</div>
            <div class="property-item"><code>nextMonthLabel</code> - Next month aria-label</div>
            <div class="property-item"><code>prevYearLabel</code> - Previous year aria-label</div>
            <div class="property-item"><code>nextYearLabel</code> - Next year aria-label</div>
            <div class="property-item"><code>switchToMonthViewLabel</code> - Switch view aria-label</div>
            <div class="property-item"><code>switchToMultiYearViewLabel</code> - Multi-year view label</div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .demo-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      color: #1976d2;
      margin-bottom: 0.5rem;
      font-size: 2rem;
    }

    .description {
      color: #666;
      margin-bottom: 2rem;
      font-size: 1rem;
    }

    .demo-section {
      margin-bottom: 2.5rem;
      padding: 1.5rem;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #ff5722;
    }

    .demo-section.rtl {
      border-left: none;
      border-right: 4px solid #ff5722;
    }

    h3 {
      margin-top: 0;
      color: #333;
      font-size: 1.3rem;
    }

    h4 {
      color: #555;
      font-size: 1.1rem;
      margin-top: 0;
      margin-bottom: 0.75rem;
    }

    .hint {
      color: #666;
      font-size: 0.9rem;
      font-style: italic;
      margin-bottom: 1rem;
      padding: 0.5rem;
      background: #fff;
      border-left: 3px solid #ff5722;
      border-radius: 2px;
    }

    .hint[dir="rtl"] {
      border-left: none;
      border-right: 3px solid #ff5722;
    }

    .locale-selector {
      background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
      border-left-color: #ff9800;
    }

    .locale-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .locale-button {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: white;
      border: 2px solid #ddd;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 1rem;
    }

    .locale-button:hover {
      border-color: #ff5722;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 87, 34, 0.2);
    }

    .locale-button.active {
      background: #ff5722;
      color: white;
      border-color: #ff5722;
      font-weight: 600;
    }

    .locale-flag {
      font-size: 1.5rem;
    }

    .locale-name {
      flex: 1;
    }

    .rtl-badge {
      padding: 0.25rem 0.5rem;
      background: #ff9800;
      color: white;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 600;
    }

    .locale-button.active .rtl-badge {
      background: rgba(255, 255, 255, 0.3);
    }

    .current-locale-info {
      padding: 1rem;
      background: white;
      border-radius: 4px;
      text-align: center;
      font-size: 0.95rem;
    }

    .separator {
      margin: 0 1rem;
      color: #ddd;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .input-group[dir="rtl"] {
      text-align: right;
    }

    label {
      font-weight: 500;
      color: #555;
    }

    input {
      padding: 0.75rem;
      border: 2px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.2s;
    }

    input:focus {
      outline: none;
      border-color: #ff5722;
    }

    .selected-value {
      padding: 0.75rem;
      background: #ffebee;
      border-radius: 4px;
      font-size: 0.9rem;
      color: #b71c1c;
    }

    .range-result {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 0.75rem;
      background: #fff3e0;
      border-radius: 4px;
    }

    .range-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background: white;
      border-radius: 4px;
    }

    .range-label {
      font-weight: 600;
      color: #e65100;
    }

    .range-value {
      color: #333;
    }

    .inline-comparison {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }

    .inline-card {
      background: white;
      padding: 1.25rem;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .inline-card h4 {
      margin: 0 0 1rem 0;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #ff5722;
      color: #ff5722;
    }

    .labels-table {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .label-row {
      display: grid;
      grid-template-columns: 200px 1fr;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #e0e0e0;
    }

    .label-row:last-child {
      border-bottom: none;
    }

    .label-row:nth-child(even) {
      background: #f5f5f5;
    }

    .label-key {
      font-weight: 600;
      color: #555;
    }

    .label-value {
      color: #ff5722;
      font-weight: 500;
    }

    .config-card {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    .config-card h4 {
      margin-top: 0;
      color: #ff5722;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }

    .config-card pre {
      margin: 0;
      background: #263238;
      color: #aed581;
      padding: 1rem;
      border-radius: 4px;
      overflow-x: auto;
    }

    .config-card code {
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      line-height: 1.6;
    }

    code {
      background: #fff3e0;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      color: #e65100;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
    }

    .properties-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 0.75rem;
    }

    .property-item {
      padding: 0.75rem;
      background: #f5f5f5;
      border-radius: 4px;
      font-size: 0.9rem;
    }

    .property-item code {
      background: #ff5722;
      color: white;
      font-weight: 600;
      margin-right: 0.5rem;
    }

    @media (max-width: 768px) {
      .label-row {
        grid-template-columns: 1fr;
        gap: 0.25rem;
      }

      .inline-comparison {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LocalizationComponent {
  private dateAdapter = inject(DateTimeAdapter<Date>);
  private intl = inject(OwlDateTimeIntl);

  currentLocale = signal<string>('en-US');

  localizedDate = signal<Date | null>(null);
  rangeDate = signal<Date[] | null>(null);
  dateTimeValue = signal<Date | null>(null);
  comparisonDate1 = signal<Date | null>(new Date());
  comparisonDate2 = signal<Date | null>(new Date());

  locales: LocaleOption[] = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸', direction: 'ltr', intl: OwlDateTimeIntl },
    { code: 'ar', name: 'العربية (Arabic)', flag: '🇸🇦', direction: 'rtl', intl: ArabicIntl },
    { code: 'fr', name: 'Français (French)', flag: '🇫🇷', direction: 'ltr', intl: FrenchIntl },
    { code: 'de', name: 'Deutsch (German)', flag: '🇩🇪', direction: 'ltr', intl: GermanIntl },
    { code: 'es', name: 'Español (Spanish)', flag: '🇪🇸', direction: 'ltr', intl: SpanishIntl },
    { code: 'ja', name: '日本語 (Japanese)', flag: '🇯🇵', direction: 'ltr', intl: JapaneseIntl }
  ];

  private arabicIntl = new ArabicIntl();
  private frenchIntl = new FrenchIntl();
  private germanIntl = new GermanIntl();
  private spanishIntl = new SpanishIntl();
  private japaneseIntl = new JapaneseIntl();
  private englishIntl = new OwlDateTimeIntl();

  changeLocale(localeCode: string) {
    this.currentLocale.set(localeCode);

    // Update DateTimeAdapter locale
    this.dateAdapter.setLocale(localeCode);

    // Update OwlDateTimeIntl labels based on selected locale
    const newIntl = this.getIntlForLocale(localeCode);
    this.intl.cancelBtnLabel = newIntl.cancelBtnLabel;
    this.intl.setBtnLabel = newIntl.setBtnLabel;
    this.intl.rangeFromLabel = newIntl.rangeFromLabel;
    this.intl.rangeToLabel = newIntl.rangeToLabel;
    this.intl.hour12AMLabel = newIntl.hour12AMLabel;
    this.intl.hour12PMLabel = newIntl.hour12PMLabel;
    this.intl.prevMonthLabel = newIntl.prevMonthLabel;
    this.intl.nextMonthLabel = newIntl.nextMonthLabel;
    this.intl.prevYearLabel = newIntl.prevYearLabel;
    this.intl.nextYearLabel = newIntl.nextYearLabel;
    this.intl.switchToMonthViewLabel = newIntl.switchToMonthViewLabel;
    this.intl.switchToMultiYearViewLabel = newIntl.switchToMultiYearViewLabel;

    // Notify that labels changed
    this.intl.changes.next();
  }

  private getIntlForLocale(localeCode: string): OwlDateTimeIntl {
    switch (localeCode) {
      case 'ar': return this.arabicIntl;
      case 'fr': return this.frenchIntl;
      case 'de': return this.germanIntl;
      case 'es': return this.spanishIntl;
      case 'ja': return this.japaneseIntl;
      default: return this.englishIntl;
    }
  }

  getCurrentDirection(): 'ltr' | 'rtl' {
    const locale = this.locales.find(l => l.code === this.currentLocale());
    return locale?.direction || 'ltr';
  }

  getCurrentLocaleName(): string {
    const locale = this.locales.find(l => l.code === this.currentLocale());
    return locale?.name || 'English (US)';
  }

  getCurrentIntl(): OwlDateTimeIntl {
    return this.getIntlForLocale(this.currentLocale());
  }

  getDateLabel(): string {
    const labels: Record<string, string> = {
      'en-US': 'Select date:',
      'ar': 'اختر التاريخ:',
      'fr': 'Sélectionnez une date:',
      'de': 'Datum auswählen:',
      'es': 'Seleccionar fecha:',
      'ja': '日付を選択:'
    };
    return labels[this.currentLocale()] || labels['en-US'];
  }

  getPlaceholder(): string {
    const labels: Record<string, string> = {
      'en-US': 'Choose date',
      'ar': 'اختر التاريخ',
      'fr': 'Choisir une date',
      'de': 'Datum wählen',
      'es': 'Elegir fecha',
      'ja': '日付を選択'
    };
    return labels[this.currentLocale()] || labels['en-US'];
  }

  getSelectedLabel(): string {
    const labels: Record<string, string> = {
      'en-US': 'Selected: ',
      'ar': 'المحدد: ',
      'fr': 'Sélectionné: ',
      'de': 'Ausgewählt: ',
      'es': 'Seleccionado: ',
      'ja': '選択済み: '
    };
    return labels[this.currentLocale()] || labels['en-US'];
  }

  getRangeLabel(): string {
    const labels: Record<string, string> = {
      'en-US': 'Select date range:',
      'ar': 'اختر نطاق التاريخ:',
      'fr': 'Sélectionnez une plage de dates:',
      'de': 'Datumsbereich auswählen:',
      'es': 'Seleccionar rango de fechas:',
      'ja': '日付範囲を選択:'
    };
    return labels[this.currentLocale()] || labels['en-US'];
  }

  getRangePlaceholder(): string {
    const labels: Record<string, string> = {
      'en-US': 'Choose date range',
      'ar': 'اختر نطاق التاريخ',
      'fr': 'Choisir une plage',
      'de': 'Bereich wählen',
      'es': 'Elegir rango',
      'ja': '範囲を選択'
    };
    return labels[this.currentLocale()] || labels['en-US'];
  }

  getRangeHint(): string {
    const labels: Record<string, string> = {
      'en-US': 'Notice the "From" and "To" labels are translated',
      'ar': 'لاحظ أن تسميات "من" و "إلى" مترجمة',
      'fr': 'Remarquez que les libellés "De" et "À" sont traduits',
      'de': 'Beachten Sie, dass die Beschriftungen "Von" und "Bis" übersetzt sind',
      'es': 'Observe que las etiquetas "Desde" y "Hasta" están traducidas',
      'ja': '「開始」と「終了」のラベルが翻訳されていることに注意してください'
    };
    return labels[this.currentLocale()] || labels['en-US'];
  }

  getFromLabel(): string {
    return this.getCurrentIntl().rangeFromLabel;
  }

  getToLabel(): string {
    return this.getCurrentIntl().rangeToLabel;
  }

  getDateTimeLabel(): string {
    const labels: Record<string, string> = {
      'en-US': 'Select date and time:',
      'ar': 'اختر التاريخ والوقت:',
      'fr': 'Sélectionnez date et heure:',
      'de': 'Datum und Uhrzeit auswählen:',
      'es': 'Seleccionar fecha y hora:',
      'ja': '日時を選択:'
    };
    return labels[this.currentLocale()] || labels['en-US'];
  }

  getDateTimePlaceholder(): string {
    const labels: Record<string, string> = {
      'en-US': 'Choose date and time',
      'ar': 'اختر التاريخ والوقت',
      'fr': 'Choisir date et heure',
      'de': 'Datum und Uhrzeit wählen',
      'es': 'Elegir fecha y hora',
      'ja': '日時を選択'
    };
    return labels[this.currentLocale()] || labels['en-US'];
  }

  getTimeHint(): string {
    const labels: Record<string, string> = {
      'en-US': 'AM/PM labels are translated for each locale',
      'ar': 'تسميات ص/م مترجمة لكل لغة',
      'fr': 'Les libellés AM/PM sont traduits pour chaque locale',
      'de': 'AM/PM-Beschriftungen sind für jedes Gebietsschema übersetzt',
      'es': 'Las etiquetas AM/PM están traducidas para cada configuración regional',
      'ja': 'AM/PMラベルは各ロケールに翻訳されています'
    };
    return labels[this.currentLocale()] || labels['en-US'];
  }
}
