import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { IUsersModulestate } from '../models';

import { UsersEffects, UsersReducer } from './users';

/**
 * REDUCERS
 */
export const UsersModuleReducer: ActionReducerMap<IUsersModulestate> = {
  users: UsersReducer,
};

/**
 * Export meta reducers
 */
export const MetaReducers: MetaReducer<IUsersModulestate>[] = [];

/**
 * EFFECTS
 */
export const UsersModuleEffects = [UsersEffects];

/**
 * PUBLIC API
 */
export * from './users';
