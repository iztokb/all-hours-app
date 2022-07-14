import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, exhaustMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as globalNavigationActions from './global-navigation.actions';
import { HttpService } from '../../services';
import { IRoutableModule, ISideMenuEntity } from '../../models';

@Injectable()
export class GlobalNavigationEffects {
  constructor(private _actions$: Actions, private _httpService: HttpService) {}

  loadSideMenuItems$ = createEffect(() =>
    this._actions$.pipe(
      ofType(globalNavigationActions.LoadSideMenuItemsAction),
      exhaustMap((req) => {
        return this._httpService
          .get<IRoutableModule[]>(
            `assets/data/side-menu-${req.moduleSignature}-${req.localization?.signature}.json`,
            true,
            null,
            null,
            false
          )
          .pipe(
            switchMap((res) => {
              const payload: IRoutableModule[] = !res
                ? []
                : (res as IRoutableModule[]);
              return [
                globalNavigationActions.LoadSideMenuItemsSuccessAction({
                  items: payload,
                }),
              ];
            }),
            catchError((error) => {
              return [
                globalNavigationActions.LoadSideMenuItemsFailedAction({
                  error,
                }),
              ];
            })
          );
      })
    )
  );

  setSideMenuItems$ = createEffect(() =>
    this._actions$.pipe(
      ofType(globalNavigationActions.LoadSideMenuItemsSuccessAction),
      exhaustMap((req) => {
        return of(req).pipe(
          switchMap((res) => {
            // Transform payload from IRoutableModule shape to ISideMenuEntity shape
            const transformedData: ISideMenuEntity[] = res.items.map((item) => {
              const transformedItem: ISideMenuEntity = {
                ...item,
                module: 'users-administration',
              };

              return transformedItem;
            });

            return [
              globalNavigationActions.SetModuleSideMenuEntitiesAction({
                entities: transformedData,
                mode: 'REPLACE',
              }),
            ];
          })
        );
      })
    )
  );
}
