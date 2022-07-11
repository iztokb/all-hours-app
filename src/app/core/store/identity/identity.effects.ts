import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { tap } from 'rxjs';
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

  resolveAuthenticatedIdentity$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(identityActions.ResolveAuthenticatedIdentityAction),
        tap((_) => {
          const tokenInStore = this._storageService.getItemFromStorage(
            'LOCAL_STORAGE',
            'AUTH_TOKEN'
          );

          if (!tokenInStore) {
            identityActions.ResolveAuthenticatedIdentityFailedAction({
              error: null,
            });
            return;
          }

          const tokenIsValid = ValidateAccessToken(tokenInStore);

          if (!tokenIsValid) {
            identityActions.ResolveAuthenticatedIdentityFailedAction({
              error: null,
            });
            return;
          }

          // Mock identity for now
          const identity: IAuthenticatedIdentity = {
            displayName: '',
            email: '',
            emailVerified: false,
            photoURL: '',
            token: tokenInStore,
            uid: GenerateGuid(),
          };

          identityActions.SetAuthenticatedIdentityAction({ identity });
        })
      ),
    {
      dispatch: false,
    }
  );

  storeAuthenticatedIdentity$ = createEffect(() =>
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

        if (tokenSaved) {
          identityActions.ResolveAuthenticatedIdentityAction({
            identityProvider: 'NONE',
          });
        }
      })
    )
  );
}
