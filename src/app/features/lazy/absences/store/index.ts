import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { IAbsencesModuleState } from '../models';

import {
  AbsenceDefinitionEffects,
  AbsenceDefinitionsReducer,
} from './absence-definition';
import { AbsencesEffects, AbsencesReducer } from './absences';
import { UsersEffects, UsersReducer } from './users';

/**
 * REDUCERS
 */
export const AbsencesModuleReducer: ActionReducerMap<IAbsencesModuleState> = {
  absence_definitions: AbsenceDefinitionsReducer,
  absences: AbsencesReducer,
  users: UsersReducer,
};

/**
 * Export meta reducers
 */
export const MetaReducers: MetaReducer<IAbsencesModuleState>[] = [];

/**
 * EFFECTS
 */
export const AbsencesModuleEffects = [
  AbsenceDefinitionEffects,
  AbsencesEffects,
  UsersEffects,
];

/**
 * PUBLIC API
 */
export * from './absence-definition';
export * from './absences';
export * from './users';
