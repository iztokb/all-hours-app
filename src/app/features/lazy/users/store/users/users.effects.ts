import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, exhaustMap, switchMap } from 'rxjs/operators';
import { Observable, EMPTY } from 'rxjs';
import * as usersActions from './users.actions';
import { HttpService } from 'src/app/core';
import { IUser, IUserApiPayload } from '../../models';
import { TransformNewUserToApiIntefacte } from '../../utils';

@Injectable()
export class UsersEffects {
  constructor(private _actions$: Actions, private _httpService: HttpService) {}

  deleteUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(usersActions.DeleteUserAction),
      exhaustMap((req) => {
        return this._httpService
          .delete(`vi/Users/${req.user.Id}`, false, null, null, true)
          .pipe(
            switchMap((res) => {
              return [
                usersActions.DeleteUsersSuccessAction({ user: req.user }),
              ];
            }),
            catchError((error) => {
              return [usersActions.DeleteUsersFailedAction({ error })];
            })
          );
      })
    )
  );

  loadUsers$ = createEffect(() => {
    return this._actions$.pipe(
      ofType(usersActions.LoadUsersAction),
      exhaustMap((req) => {
        return this._httpService
          .get<IUser[]>('v1/Users', false, null, null, true)
          .pipe(
            switchMap((res) => {
              const users: IUser[] = !res ? [] : (res as IUser[]);
              return [usersActions.LoadUsersSuccessAction({ users })];
            }),
            catchError((error) => {
              return [usersActions.LoadUsersFailedAction({ error })];
            })
          );
      })
    );
  });

  postUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(usersActions.PostUserAction),
      exhaustMap((req) => {
        // Transform record to the interface that is acceptable for API
        const transformedRecord = TransformNewUserToApiIntefacte(req.record);
        return this._httpService
          .post<IUserApiPayload>(
            'v1/Users',
            false,
            transformedRecord,
            null,
            null,
            true
          )
          .pipe(
            switchMap((res) => {
              const payload = res as unknown as IUser;
              return [usersActions.PostUserSuccessAction({ user: payload })];
            }),
            catchError((error) => {
              return [usersActions.PostUserFailedAction({ error })];
            })
          );
      })
    )
  );

  updateUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(usersActions.PostUserAction),
      exhaustMap((req) => {
        return this._httpService
          .put<IUserApiPayload>(
            `vi/Users/${req.record.Id}`,
            false,
            req.record,
            null,
            null,
            true
          )
          .pipe(
            switchMap((res) => {
              const payload = res as unknown as IUser;
              return [usersActions.UpdateUserSuccessAction({ user: payload })];
            }),
            catchError((error) => {
              return [usersActions.UpdateUserFailedAction({ error })];
            })
          );
      })
    )
  );
}
