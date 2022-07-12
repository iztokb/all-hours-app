import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  IApplicationState,
  IConfigurationProperties,
  IReferredFrom,
  ITheme,
} from '../models';
import {
  getApplicationConfiguration$,
  getInitialRoute$,
  getNextTheme$,
  SwitchThemeAction,
} from '../store';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService extends BaseService {
  /**
   * PUBLIC API
   * Expose all selectors that are relevant to the application settings as
   * plain observables so modules that don't use @ngrx/store can access those
   * settings
   */
  applicationConfiguration$!: Observable<IConfigurationProperties | null>;

  initiallyRequestedRoute$!: Observable<IReferredFrom | null>;

  /**
   * @description
   * Next theme
   */
  nextTheme$!: Observable<ITheme | null>;

  constructor(
    private _store: Store<IApplicationState>,
    private _storageService: StorageService
  ) {
    super();

    this.applicationConfiguration$ = this._store.pipe(
      select(getApplicationConfiguration$)
    );

    this.initiallyRequestedRoute$ = this._store.pipe(select(getInitialRoute$));

    this.nextTheme$ = this._store.pipe(select(getNextTheme$));
  }

  changeTheme(theme: ITheme): void {
    this._store.dispatch(SwitchThemeAction({ currentTheme: theme }));
  }

  resolveTheme(
    storageKey: string,
    defaultTheme: ITheme,
    supportedThemes: ITheme[]
  ): ITheme {
    // Check if there is any theme record in locale storage
    const storedTheme: string | null = this._storageService.getItemFromStorage(
      'LOCAL_STORAGE',
      storageKey
    );

    /**
     * If theme is stored in local storage then assume that user wants to use that theme
     * There is catch if theme is no longer supported, so it must be
     */
    if (storedTheme) {
      const storedThemeRecord: ITheme = JSON.parse(storedTheme);

      const themeIsSupported = supportedThemes.some(
        (item) => item.class === storedThemeRecord.class
      );

      if (themeIsSupported) {
        return storedThemeRecord;
      }
    }

    /**
     * Theme is not stored or stored value is not valid
     */
    return defaultTheme;
  }
}
