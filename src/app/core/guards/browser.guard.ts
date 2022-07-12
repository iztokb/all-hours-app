import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter, map, Observable, take } from 'rxjs';
import { IApplicationState } from '../models';
import { getBrowserEnvironment$ } from '../store';

@Injectable({
  providedIn: 'root',
})
export class BrowserGuard implements CanActivate, CanLoad {
  constructor(private _store: Store<IApplicationState>) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._store.pipe(
      select(getBrowserEnvironment$),
      map((browser) => {
        if (!browser) {
          return false;
        }

        if (browser.name === 'IE') {
          console.warn('Unsupported browser');
          return false;
        } else {
          return true;
        }
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this._store.pipe(
      select(getBrowserEnvironment$),
      filter((stream) => stream !== null),
      take(1),
      map((browser) => {
        if (!browser) {
          return false;
        }

        if (browser.name === 'IE') {
          console.warn('Unsupported browser');
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
