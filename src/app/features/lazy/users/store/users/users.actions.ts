import { createAction, props } from '@ngrx/store';
import { IAbsence } from 'src/app/features/shared/api-models';
import { IUser } from 'src/app/features/shared/api-models';

export const DeleteUserAction = createAction(
  '[Users] Delete user',
  props<{ user: IUser }>()
);

export const DeleteUsersFailedAction = createAction(
  '[Users] Delete user failed',
  props<{ error: any }>()
);

export const DeleteUsersSuccessAction = createAction(
  '[Users] Delete user success',
  props<{ user: IUser }>()
);

export const LoadUsersAction = createAction('[Users] Load Users');

export const LoadUsersFailedAction = createAction(
  '[Users] Load Users failed',
  props<{ error: any }>()
);

export const LoadUsersSuccessAction = createAction(
  '[Users] Load Users success',
  props<{ users: IUser[] }>()
);

export const PostUserAbsenceAction = createAction(
  '[Users] Post absence for user',
  props<{ absence: IAbsence }>()
);

export const PostUserAbsenceFailedAction = createAction(
  '[Users] Post absence for user failed',
  props<{ error: any }>()
);

export const PostUserAbsenceSuccessAction = createAction(
  '[Users] Post absence for user success',
  props<{ absence: IAbsence }>()
);

export const PostUserAction = createAction(
  '[Users] Post user',
  props<{ record: IUser }>()
);

export const PostUserFailedAction = createAction(
  '[Users] Post user failed',
  props<{ error: any }>()
);

export const PostUserSuccessAction = createAction(
  '[Users] Post user success',
  props<{ user: IUser }>()
);

export const ResetUsersStoreSliceAction = createAction(
  '[Users] Reset store slice to default state'
);

export const UpdateUserAction = createAction(
  '[Users] Update user',
  props<{ record: IUser }>()
);

export const UpdateUserFailedAction = createAction(
  '[Users] Update user failed',
  props<{ error: any }>()
);

export const UpdateUserSuccessAction = createAction(
  '[Users] Update user success',
  props<{ user: IUser }>()
);

export const UsersSearchChangedAction = createAction(
  '[Users] Users search changed',
  props<{ search: string }>()
);
