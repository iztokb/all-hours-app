import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAbsence } from 'src/app/features/shared/api-models';
import { IAbsencesModuleState } from '../../models';
import * as fromAbsences from './absences.reducer';

export const getAbsencesFeatureSlice$ =
  createFeatureSelector<IAbsencesModuleState>('absences');

/**
 * @description
 * Get absences state
 */
export const getAbsencesState$ = createSelector(
  getAbsencesFeatureSlice$,
  (state) => state.absences
);

/**
 * @description
 * Get information if absences request is done
 */
export const getAbsencesRequestDone$ = createSelector(
  getAbsencesState$,
  (state) => state.loaded
);

/**
 * @description
 * Get information if absences request is in progress
 */
export const getAbsencesRequestInProgress$ = createSelector(
  getAbsencesState$,
  (state) => state.loading
);

/**
 * @description
 * Get absences entities
 */
const getAbsencesEntities$ = createSelector(
  getAbsencesState$,
  (state) => state.entities
);

/**
 * @description
 * Get absences list
 */
const getAbsencesRawList$ = createSelector(getAbsencesEntities$, (entities) => {
  return Object.keys(entities).map((key) => entities[key]) as IAbsence[];
});

/**
 * @description
 * Get absences list
 */
export const getAbsencesList$ = createSelector(getAbsencesRawList$, (list) => {
  if (!list) {
    return [];
  }

  return list;
});
