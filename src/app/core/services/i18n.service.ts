import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import {
  IApplicationState,
  ILocalization,
  SupportedLocalizations,
} from '../models';
import { geti18nActiveLocalization$, LoadLocalizationAction } from '../store';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class I18nService extends BaseService {
  /**
   * PUBLIC API
   * Expose all selectors that are relevant to the application i18n as
   * plain observables so modules that don't use @ngrx/store can access those
   * settings
   */
  /**
   * @description
   * Active localization facade
   */
  activeLocalization$!: Observable<ILocalization | null>;

  constructor(
    private _store: Store<IApplicationState>,
    private _storageService: StorageService
  ) {
    super();

    this.activeLocalization$ = this._store.pipe(
      select(geti18nActiveLocalization$),
      filter((localization) => localization !== null)
    );
  }

  /**
   * @description
   * Method responsible for dispatching apropriate command to load localizations for module with provided signature
   * @param { ILocalization } localization
   * @param { string } moduleSignature
   * @returns { void }
   */
  loadModuleLocalizations(
    localization: ILocalization,
    moduleSignature: string
  ): void {
    console.log('loadModuleLocalizations', localization, moduleSignature);
    this._store.dispatch(
      LoadLocalizationAction({
        localization: localization?.signature,
        currentLocalization: localization?.signature,
        moduleSignature,
      })
    );
  }

  /**
   * @description
   * Method responsible for resolving localization that should be set on application init
   * @param { string } storageKey
   * @param { string } browserLanguage
   * @param { string } acceptedLanguages
   * @param { SupportedLocalizations[] } supportedLanguages
   * @returns { SupportedLocalizations }
   */
  resolveLocalization(
    storageKey: string,
    browserLanguage: string,
    acceptedLanguages: string[],
    supportedLanguages: SupportedLocalizations[]
  ): SupportedLocalizations {
    const storedLocalization = this._storageService.getItemFromStorage(
      'LOCAL_STORAGE',
      storageKey
    );

    /**
     * If language is stored in local storage then assume that user wants to use
     * app in that language
     */
    if (storedLocalization) {
      return storedLocalization as SupportedLocalizations;
    }

    /**
     * As browsers can return language as en or en-US its best to trim all to first two chars
     */
    const defaultBrowserLanguage = browserLanguage as SupportedLocalizations;

    /**
     * Check if language is present in the list of supported localizations. If it is then pick that as
     * selected language
     */
    const defaultBrowserLanguageIsSupported = supportedLanguages.some(
      (item) => item === defaultBrowserLanguage
    );

    if (defaultBrowserLanguageIsSupported) {
      return defaultBrowserLanguage;
    }

    /**
     * Default browser language is not supported. Now pick the first supported language that is on the list of supported languages.
     */
    const firstSupportedLanguage = acceptedLanguages.find((language) => {
      return supportedLanguages.some((item) => item === language);
    });

    if (firstSupportedLanguage) {
      return firstSupportedLanguage as SupportedLocalizations;
    }

    /**
     * Everything failed. Fall back to en-US
     */
    return 'en-US';
  }
}
