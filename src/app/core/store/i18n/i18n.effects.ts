import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import {
  Observable,
  mergeMap,
  exhaustMap,
  filter,
  map,
  switchMap,
  tap,
  catchError,
} from 'rxjs';
import * as i18nActions from './i18n.actions';
import { getSupportedLocalizations$ } from '../settings';
import {
  IApplicationState,
  Ii18nPhrase,
  SupportedLocalizations,
} from '../../models';
import { select, Store } from '@ngrx/store';
import { HttpService, I18nService, StorageService } from '../../services';

@Injectable()
export class I18nEffects {
  constructor(
    private _actions$: Actions,
    private _store: Store<IApplicationState>,
    private _httpService: HttpService,
    private _i18nService: I18nService,
    private _storageService: StorageService
  ) {}

  i18nResolveLocalization$ = createEffect(() =>
    this._actions$.pipe(
      ofType(i18nActions.ResolveLocalizationAction),
      exhaustMap((req) => {
        return this._store.pipe(
          select(getSupportedLocalizations$),
          filter((s) => s !== null),
          map((supportedLocalizations: SupportedLocalizations[]) => {
            const localization = this._i18nService.resolveLocalization(
              req.storageKey,
              req.browserLanguage,
              req.acceptedLanguages,
              supportedLocalizations as SupportedLocalizations[]
            );

            return localization;
          }),
          switchMap((res) => {
            return [
              i18nActions.SetLocalizationAction({
                localization: res,
              }),
            ];
          })
        );
      })
    )
  );

  i18nSetLocalization$ = createEffect(() =>
    this._actions$.pipe(
      ofType(i18nActions.SetLocalizationAction),
      switchMap((req) => {
        return [
          i18nActions.StoreLocalizationAction({
            localization: req.localization,
            storage: 'LOCAL_STORAGE',
          }),
        ];
      })
    )
  );

  i18nStoreLocalization$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(i18nActions.StoreLocalizationAction),
        tap((req) => {
          // Check currently stored item for localization
          const existingItem = this._storageService.getItemFromStorage(
            'LOCAL_STORAGE',
            'LOCALIZATION'
          );

          if (existingItem !== req.localization) {
            const recordSaved = this._storageService.saveItemToStorage(
              'LOCAL_STORAGE',
              { key: 'LOCALIZATION', value: req.localization }
            );

            // Perform window relead as LOCALE_ID and MAT_DATE_LOCALE can only be set once
            // It sucks but thats how it is
            window.location.reload();
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  i18nPhrases$ = createEffect(() =>
    this._actions$.pipe(
      ofType(i18nActions.LoadLocalizationAction),
      mergeMap((req) => {
        return this._httpService
          .get<Ii18nPhrase[]>(
            `assets/i18n/${req.moduleSignature}-localization-${req.localization}.json`,
            true,
            null,
            null,
            false
          )
          .pipe(
            switchMap((apiResponse: any) => {
              const phrasesList: Ii18nPhrase[] = !apiResponse
                ? []
                : (apiResponse as Ii18nPhrase[]);
              return [
                i18nActions.LoadLocalizationSuccessAction({
                  localization: req.localization,
                  phraseList: phrasesList,
                }),
              ];
            }),
            catchError((error) => {
              return [i18nActions.LoadLocalizationFailedAction({ error })];
            })
          );
      })
    )
  );
}
