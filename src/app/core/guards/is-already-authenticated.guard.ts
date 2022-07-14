import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, switchMap, tap, of } from 'rxjs';
import { IApplicationState } from '../models';
import { IdentityService } from '../services';
import { RouterGoAction } from '../store';

@Injectable({
  providedIn: 'root',
})
export class IsAlreadyAuthenticatedGuard implements CanActivate {
  constructor(
    private _store: Store<IApplicationState>,
    private _identityService: IdentityService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this._identityService.resolveAuthenticatedIdentity$.pipe(
      tap((identity) => {
        if (identity) {
          this._store.dispatch(
            RouterGoAction({
              path: ['app'],
            })
          );
        }
      }),
      switchMap((identity) => {
        if (identity) {
          return of(false);
        } else {
          return of(true);
        }
      })
    );
  }
}
