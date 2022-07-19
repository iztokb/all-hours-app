import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IUser, IUsersState } from '../../models';
import * as usersActions from './users.actions';

const usersAdapter: EntityAdapter<IUser> = createEntityAdapter<IUser>({
  selectId: (record: IUser) => record.Id,
  sortComparer: false,
});

export const USERS_INITIAL_STATE: IUsersState = usersAdapter.getInitialState({
  activeSearch: '',
  deleted: false,
  deleting: false,
  loaded: false,
  loading: false,
  posted: false,
  posting: false,
  updated: false,
  updating: false,
});

export const UsersReducer = createReducer(
  USERS_INITIAL_STATE,
  on(usersActions.DeleteUserAction, (state, payload) => {
    return {
      ...state,
      deleted: false,
      deleting: true,
    };
  }),
  on(usersActions.DeleteUsersFailedAction, (state, payload) => {
    return {
      ...state,
      deleted: false,
      deleting: false,
    };
  }),
  on(usersActions.DeleteUsersSuccessAction, (state, payload) => {
    return usersAdapter.removeOne(payload.user.Id, {
      ...state,
      deleted: true,
      deleting: false,
    });
  }),
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
  }),
  on(usersActions.PostUserAbsenceAction, (state, payload) => {
    return {
      ...state,
      posted: false,
      posting: true,
    };
  }),
  on(usersActions.PostUserAbsenceFailedAction, (state, payload) => {
    return {
      ...state,
      posted: false,
      posting: false,
    };
  }),
  on(usersActions.PostUserAbsenceSuccessAction, (state, payload) => {
    return {
      ...state,
      posted: true,
      posting: false,
    };
  }),
  on(usersActions.PostUserAction, (state, payload) => {
    return {
      ...state,
      posted: false,
      posting: true,
    };
  }),
  on(usersActions.PostUserFailedAction, (state, payload) => {
    return {
      ...state,
      posted: false,
      posting: false,
    };
  }),
  on(usersActions.PostUserSuccessAction, (state, payload) => {
    return usersAdapter.upsertOne(payload.user, {
      ...state,
      posted: true,
      posting: false,
    });
  }),
  on(usersActions.ResetUsersStoreSliceAction, (state, payload) => {
    return USERS_INITIAL_STATE;
  }),
  on(usersActions.UpdateUserAction, (state, payload) => {
    return {
      ...state,
      updated: false,
      updating: true,
    };
  }),
  on(usersActions.UpdateUserFailedAction, (state, payload) => {
    return {
      ...state,
      updated: false,
      updating: false,
    };
  }),
  on(usersActions.UpdateUserSuccessAction, (state, payload) => {
    return usersAdapter.upsertOne(payload.user, {
      ...state,
      updated: true,
      updating: false,
    });
  }),
  on(usersActions.UsersSearchChangedAction, (state, payload) => {
    return {
      ...state,
      activeSearch: payload.search,
    };
  })
);
