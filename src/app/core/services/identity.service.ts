import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, skipWhile, switchMap } from 'rxjs';
import {
  getAuthenticatedIdentity$,
  getResolvingAuthenticatedIdentityInProgress$,
  RouterGoAction,
  SetAuthenticatedIdentityAction,
  StoreAuthTokenAction,
} from '../store';
import { IApplicationState, IAuthenticatedIdentity } from '../models';
import { StorageService } from './storage.service';
import { GenerateGuid, ValidateAccessToken } from '../utils';

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

  setAccessToken(token: string, redirectUrl: string[]): void {
    // First try and validate provided token
    const tokenIsValid: boolean = ValidateAccessToken(token);

    // Setup authenticated identity.
    const identity: IAuthenticatedIdentity = {
      displayName: 'Samo Uporabnik',
      email: 'some.uporabnik@neznani.mail',
      emailVerified: false,
      photoURL: '',
      token: token,
      uid: GenerateGuid(),
    };

    // First store token
    this._store.dispatch(StoreAuthTokenAction({ token: token }));

    /* this._store.dispatch(
      SetAuthenticatedIdentityAction({ identity, redirectUrl })
    ); */

    //

    /* this._store.dispatch(
      RouterGoAction({
        path: redirectUrl,
        extras: null,
        query: null,
      })
    ); */
  }
}
