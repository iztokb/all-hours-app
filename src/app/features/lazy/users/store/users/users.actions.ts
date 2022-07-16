import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models';

export const LoadUsersAction = createAction('[Users] Load Users');

export const LoadUsersFailedAction = createAction(
  '[Users] Load Users failed',
  props<{ error: any }>()
);

export const LoadUsersSuccessAction = createAction(
  '[Users] Load Users success',
  props<{ users: IUser[] }>()
);

export const ResetUsersStoreSliceAction = createAction(
  '[Users] Reset store slice to default state'
);

export const UsersSearchChangedAction = createAction(
  '[Users] Users search changed',
  props<{ search: string }>()
);
