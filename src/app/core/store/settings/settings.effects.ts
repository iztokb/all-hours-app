import { Injectable } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, EMPTY, concatMap, map, tap } from 'rxjs';
import * as settingsActions from './settings.actions';

import { IApplicationState, ITheme } from '../../models';
import {
  EnvironmentService,
  SettingsService,
  StorageService,
} from '../../services';

@Injectable()
export class SettingsEffects {
  constructor(
    private _store: Store<IApplicationState>,
    private _actions$: Actions,
    private _overlayContainer: OverlayContainer,
    private _environmentService: EnvironmentService,
    private _storageService: StorageService,
    private _settingsService: SettingsService
  ) {}

  resolveTheme$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(settingsActions.ResolveThemeAction),
        map((req) => {
          const theme: ITheme = this._settingsService.resolveTheme(
            req.storageKey,
            req.defaultTheme,
            req.supportedThemes
          );

          if (theme) {
            this._store.dispatch(
              settingsActions.SwitchThemeAction({ currentTheme: theme })
            );
          }
        })
      ),
    {
      dispatch: false,
    }
  );

  storeTheme$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(settingsActions.StoreThemeAction),
        tap((req) => {
          const recordToBeSaved = this._storageService.saveItemToStorage(
            req.storage,
            {
              key: 'THEME',
              value: JSON.stringify(req.theme),
            }
          );
        })
      ),
    { dispatch: false }
  );

  switchTheme$ = createEffect(() =>
    this._actions$.pipe(
      ofType(settingsActions.SwitchThemeAction),
      tap((theme) => {
        // List of all classes
        const classList =
          this._overlayContainer.getContainerElement().classList;

        // Classes to be removed
        const toRemove = Array.from(classList).filter((item: string) =>
          item.includes('-theme')
        );

        if (toRemove.length) {
          classList.remove(...toRemove);
        }

        classList.add(theme.currentTheme.class);
      }),
      map((stream) => {
        return settingsActions.StoreThemeAction({
          storage: 'LOCAL_STORAGE',
          theme: stream.currentTheme,
        });
      })
    )
  );
}
