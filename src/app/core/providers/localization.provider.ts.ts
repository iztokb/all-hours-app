import { LOCALE_ID, StaticClassProvider } from '@angular/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { I18nService } from '../services';
import { SupportedLocalizations } from '../models';
import { environment } from '../../../environments/environment';

export class LocaleIdFactory extends String {
  acceptedLanguages: string[] = navigator.languages as string[];

  browserLanguage: string = navigator.language;

  storageKey = 'LOCALIZATION';

  supportedLocalizations =
    environment.supportedLocalizations as unknown[] as SupportedLocalizations[];

  constructor(private _i18nService: I18nService) {
    super();
  }

  override toString() {
    const locale = this._i18nService.resolveLocalization(
      this.storageKey,
      this.browserLanguage,
      this.acceptedLanguages,
      this.supportedLocalizations
    );

    return locale;
  }
}

export const LocaleProvider: StaticClassProvider = {
  provide: LOCALE_ID,
  useClass: LocaleIdFactory,
  deps: [I18nService],
};

export const MatLocaleProvider: StaticClassProvider = {
  provide: MAT_DATE_LOCALE,
  useClass: LocaleIdFactory,
  deps: [I18nService],
};
