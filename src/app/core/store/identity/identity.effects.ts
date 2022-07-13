import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of, tap, exhaustMap, throwError, catchError, switchMap } from 'rxjs';
import { IdentityService, StorageService } from '../../services';
import * as identityActions from './identity.actions';
import { RouterGoAction } from '../router';
import { GenerateGuid, ValidateAccessToken } from '../../utils';
import { IAuthenticatedIdentity, IStorageItem } from '../../models';

@Injectable()
export class IdentityEffects {
  constructor(
    private _actions$: Actions,
    private _storageService: StorageService,
    private _identityService: IdentityService
  ) {}

  logoutAuthenticatedIdentity$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(identityActions.LogoutAuthenticatedIdentityAction),
        tap((req) => {
          // Remove token from storage
          this._storageService.deleteItemFromStorage(
            'LOCAL_STORAGE',
            'AUTH_TOKEN'
          );

          // Navigate to the home page
          RouterGoAction({
            path: ['/'],
            extras: null,
            query: null,
          });
        })
      ),
    { dispatch: false }
  );

  resolveAuthenticatedIdentity$ = createEffect(() =>
    this._actions$.pipe(
      ofType(identityActions.ResolveAuthenticatedIdentityAction),
      exhaustMap((req) => {
        const tokenInStore = this._storageService.getItemFromStorage(
          'LOCAL_STORAGE',
          'AUTH_TOKEN'
        );

        if (!tokenInStore) {
          return [
            identityActions.ResolveAuthenticatedIdentityFailedAction({
              error: 'Token not present in storage',
            }),
          ];
        }

        const tokenIsValid = ValidateAccessToken(tokenInStore);

        if (!tokenIsValid) {
          return [
            identityActions.ResolveAuthenticatedIdentityFailedAction({
              error: 'Token in storage is not valid',
            }),
          ];
        }

        // Mock identity for now
        const identity: IAuthenticatedIdentity = {
          displayName: 'Samo Uporabnik',
          email: 'some.uporabnik@neznani.mail',
          emailVerified: false,
          photoURL: '',
          token: tokenInStore,
          uid: GenerateGuid(),
        };

        return of(identity).pipe(
          switchMap((res) => {
            return [
              identityActions.ResolveAuthenticatedIdentitySuccessAction({
                identity: res,
                redirectUrl: req.redirectUrl,
              }),
            ];
          }),
          catchError((error) => {
            return [
              identityActions.ResolveAuthenticatedIdentityFailedAction({
                error,
              }),
            ];
          })
        );
      })
    )
  );

  storeAuthenticatedIdentity$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(identityActions.StoreAuthTokenAction),
        tap((req) => {
          const item: IStorageItem = {
            key: 'AUTH_TOKEN',
            value: req.token,
          };

          const tokenSaved = this._storageService.saveItemToStorage(
            'LOCAL_STORAGE',
            item
          );
        })
      ),
    {
      dispatch: false,
    }
  );
}
