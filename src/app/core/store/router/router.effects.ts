import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  ROUTER_REQUEST,
  RouterRequestAction,
  RouterRequestPayload,
  SerializedRouterStateSnapshot,
  ROUTER_NAVIGATION,
} from '@ngrx/router-store';
import { Observable, EMPTY, tap, concatMap, map } from 'rxjs';
import * as routerActions from './router.actions';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../models';
import { SetInititallyRequestedRouteAction } from '../settings';

@Injectable()
export class RouterEffects {
  constructor(
    private _store: Store<IApplicationState>,
    private _actions$: Actions,
    private _router: Router,
    private _location: Location
  ) {}

  initialRequestedRoute$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        /** An EMPTY observable only emits completion. Replace with your own observable stream */
        map((action: any) => action.payload),
        tap((navigation) => {
          if (navigation.event.id === 1) {
            const url = navigation.routerState.pathFromRoot;

            this._store.dispatch(
              SetInititallyRequestedRouteAction({
                redirectedFrom: {
                  url,
                  params: navigation?.routerState.params,
                  queryParams: navigation?.routerState.queryParams,
                },
              })
            );
          }
        })
      ),
    { dispatch: false }
  );

  navigate$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(routerActions.RouterGoAction),
        tap(({ path, query: queryParams, extras }) => {
          this._router.navigate(path, { queryParams, ...extras });
        })
      ),
    {
      dispatch: false,
    }
  );

  navigateBack$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(routerActions.RouterBackAction),
        tap(() => this._location.back())
      ),
    {
      dispatch: false,
    }
  );

  navigateForward$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(routerActions.RouterForwardAction),
        tap(() => this._location.forward())
      ),
    {
      dispatch: false,
    }
  );
}
