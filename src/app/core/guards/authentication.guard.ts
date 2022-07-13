import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Params,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, skipWhile, switchMap, tap, map } from 'rxjs';
import { IApplicationState, INotAuthenticatedRedirectData } from '../models';
import {
  getResolvingAuthenticatedIdentityInProgress$,
  getAuthenticatedIdentity$,
  RouterGoAction,
} from '../store';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private _store: Store<IApplicationState>) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const requestedUrl: string[] = [];
    const queryParams: Params = route.queryParams;

    return this._store.pipe(
      select(getResolvingAuthenticatedIdentityInProgress$),
      skipWhile((stream) => stream === true),
      switchMap((_) => {
        return this._store.pipe(
          select(getAuthenticatedIdentity$),
          tap((identity) => {
            if (!identity) {
              const redirectData: INotAuthenticatedRedirectData = {
                requestedQueryParams: queryParams,
                requestedUrl: requestedUrl,
              };
              const encodedData = btoa(JSON.stringify(redirectData));

              this._store.dispatch(
                RouterGoAction({
                  path: ['authentication'],
                  query: {
                    redirect: encodedData,
                  },
                })
              );
            }
          }),
          map((identity) => {
            if (identity) {
              return true;
            } else {
              return false;
            }
          })
        );
      })
    );
  }
}
