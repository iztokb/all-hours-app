import { createAction, props } from '@ngrx/store';
import { IUser } from 'src/app/features/shared/api-models';

export const LoadUsersAction = createAction('[Users] Load Users');

export const LoadUsersFailedAction = createAction(
  '[Users] Load Users failed',
  props<{ error: any }>()
);

export const LoadUsersSuccessAction = createAction(
  '[Users] Load Users success',
  props<{ users: IUser[] }>()
);
