import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { exhaustMap, switchMap, of, mergeMap } from 'rxjs';
import * as environmentActions from './environment.actions';
import { EnvironmentService } from '../../services';
import { ResolveBrowserEnvironment } from '../../utils';
import { IBrowser, IScreenProperties } from '../../models';
import { ResolveLocalizationAction } from '../i18n/i18n.actions';

@Injectable()
export class EnvironmentEffects {
  constructor(
    private _actions$: Actions,
    private _environmentService: EnvironmentService
  ) {}

  applicationisOffline$ = createEffect(() =>
    this._actions$.pipe(
      ofType(environmentActions.SubscribeToOfflineChangesAction),
      exhaustMap((_) => {
        return this._environmentService.offlineEvent$.pipe(
          switchMap((res) => {
            return [
              environmentActions.OnlineStatusChangedAction({
                isOnline: false,
              }),
            ];
          })
        );
      })
    )
  );

  applicationisOnline$ = createEffect(() =>
    this._actions$.pipe(
      ofType(environmentActions.SubscribeToOfflineChangesAction),
      exhaustMap((_) => {
        return this._environmentService.onlineEvent$.pipe(
          switchMap((res) => {
            return [
              environmentActions.OnlineStatusChangedAction({
                isOnline: true,
              }),
            ];
          })
        );
      })
    )
  );

  resolveBrowser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(environmentActions.ResolveBrowserAction),
      exhaustMap((_) => {
        return of(ResolveBrowserEnvironment()).pipe(
          switchMap((res: IBrowser | null) => {
            if (!res) {
              return [];
            }

            return [
              environmentActions.ResolveBrowserSuccessAction({
                browser: res,
              }),
            ];
          })
        );
      })
    )
  );

  browserIsResolved$ = createEffect(() =>
    this._actions$.pipe(
      ofType(environmentActions.ResolveBrowserSuccessAction),
      exhaustMap((req) => {
        return [
          ResolveLocalizationAction({
            storageKey: 'LOCALIZATION',
            acceptedLanguages: req.browser.acceptedLanguages,
            browserLanguage: req.browser.browserLanguage,
          }),
        ];
      })
    )
  );

  resolveScreenProperties$ = createEffect(() =>
    this._actions$.pipe(
      ofType(environmentActions.ScreenPropertiesChangedAction),
      mergeMap((_) => {
        return this._environmentService.screenResizeEvent$.pipe(
          switchMap((res) => {
            return [
              environmentActions.ScreenPropertiesChangedAction({ screen: res }),
            ];
          })
        );
      })
    )
  );
}
