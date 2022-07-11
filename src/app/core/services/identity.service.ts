import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, skipWhile, switchMap } from 'rxjs';
import {
  getAuthenticatedIdentity$,
  getResolvingAuthenticatedIdentityInProgress$,
} from '../store';
import { IApplicationState, IAuthenticatedIdentity } from '../models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  /**
   * PUBLIC API
   * Expose all selectors and actions that are relevant to the application i18n as
   * plain observables so modules that don't use @ngrx/store can access those
   * settings
   */
  /**
   * @description
   * Authenticated identity facade
   */
  resolveAuthenticatedIdentity$!: Observable<IAuthenticatedIdentity | null>;

  constructor(
    private _store: Store<IApplicationState>,
    private _storageService: StorageService
  ) {
    this.resolveAuthenticatedIdentity$ = this._store.pipe(
      select(getResolvingAuthenticatedIdentityInProgress$),
      skipWhile((flag) => {
        const assert = flag === null || flag === true;
        return assert;
      }),
      switchMap((_) => {
        return this._store.pipe(select(getAuthenticatedIdentity$));
      })
    );
  }
}
