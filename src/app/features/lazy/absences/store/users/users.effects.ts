import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { exhaustMap, switchMap, catchError } from 'rxjs';
import { HttpService } from 'src/app/core';
import { IUser } from 'src/app/features/shared/api-models';
import * as usersActions from './users.actions';

@Injectable()
export class UsersEffects {
  constructor(private _actions$: Actions, private _httpService: HttpService) {}

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
}
