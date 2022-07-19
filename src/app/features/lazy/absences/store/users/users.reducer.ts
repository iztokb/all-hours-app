import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/features/shared/api-models';
import { IUsersState } from '../../models';
import * as usersActions from './users.actions';

const usersAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({
  selectId: (record: IUser) => record.Id,
  sortComparer: false,
});

export const USERS_INITIAL_STATE: IUsersState = usersAdapter.getInitialState({
  loaded: false,
  loading: false,
});

export const UsersReducer = createReducer(
  USERS_INITIAL_STATE,
  on(usersActions.LoadUsersAction, (state, payload) => {
    return {
      ...state,
      loaded: false,
      loading: true,
    };
  }),
  on(usersActions.LoadUsersFailedAction, (state, payload) => {
    return {
      ...state,
      loaded: false,
      loading: false,
    };
  }),
  on(usersActions.LoadUsersSuccessAction, (state, payload) => {
    return usersAdapter.upsertMany(payload.users, {
      ...state,
      loaded: true,
      loading: false,
    });
  })
);
