import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of, tap, exhaustMap, throwError, catchError, switchMap } from 'rxjs';
import { IdentityService, StorageService } from '../../services';
import * as identityActions from './identity.actions';
import { RouterGoAction } from '../router';
import { GenerateGuid, ValidateAccessToken } from '../../utils';
import { IAuthenticatedIdentity, IStorageItem } from '../../models';
import { Router } from '@angular/router';

@Injectable()
export class IdentityEffects {
  constructor(
    private _actions$: Actions,
    private _storageService: StorageService,
    private _identityService: IdentityService
  ) {}

  logoutAuthenticatedIdentity$ = createEffect(() =>
    this._actions$.pipe(
      ofType(identityActions.LogoutAuthenticatedIdentityAction),
      exhaustMap((req) => {
        return of(req).pipe(
          tap((req) => {
            // Remove token from storage
            this._storageService.deleteItemFromStorage(
              'LOCAL_STORAGE',
              'AUTH_TOKEN'
            );
          }),
          switchMap((res) => {
            return [identityActions.LogoutAuthenticatedIdentitySuccessAction()];
          }),
          catchError((error) => {
            return [
              identityActions.LogoutAuthenticatedIdentityFailedAction({
                error,
              }),
            ];
          })
        );
      })
    )
  );

  logoutAuthenticatedIdentitySuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(identityActions.LogoutAuthenticatedIdentitySuccessAction),
      exhaustMap((req) => {
        return of(req).pipe(
          switchMap((res) => {
            return [RouterGoAction({ path: ['/authentication'] })];
          })
        );
      })
    )
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

  setAuthenticatedIdentity$ = createEffect(() =>
    this._actions$.pipe(
      ofType(identityActions.SetAuthenticatedIdentityAction),
      exhaustMap((req) => {
        return of(req).pipe(
          switchMap((res) => {
            return [
              RouterGoAction({
                path: res.redirectUrl,
                extras: null,
                query: null,
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
