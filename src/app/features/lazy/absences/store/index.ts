import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { IAbsencesModuleState } from '../models';

import { AbsencesEffects, AbsencesReducer } from './absences';

/**
 * REDUCERS
 */
export const AbsencesModuleReducer: ActionReducerMap<IAbsencesModuleState> = {
  absences: AbsencesReducer,
};

/**
 * Export meta reducers
 */
export const MetaReducers: MetaReducer<IAbsencesModuleState>[] = [];

/**
 * EFFECTS
 */
export const AbsencesModuleEffects = [AbsencesEffects];

/**
 * PUBLIC API
 */
export * from './absences';
