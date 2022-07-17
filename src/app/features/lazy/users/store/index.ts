import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { IUsersModulestate } from '../models';

import {
  AbsenceDefinitionEffects,
  AbsenceDefinitionsReducer,
} from './absence-definition';
import { UsersEffects, UsersReducer } from './users';

/**
 * REDUCERS
 */
export const UsersModuleReducer: ActionReducerMap<IUsersModulestate> = {
  absence_definitions: AbsenceDefinitionsReducer,
  users: UsersReducer,
};

/**
 * Export meta reducers
 */
export const MetaReducers: MetaReducer<IUsersModulestate>[] = [];

/**
 * EFFECTS
 */
export const UsersModuleEffects = [AbsenceDefinitionEffects, UsersEffects];

/**
 * PUBLIC API
 */
export * from './absence-definition';
export * from './users';
