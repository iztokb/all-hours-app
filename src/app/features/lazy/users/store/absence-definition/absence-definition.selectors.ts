import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAbsenceDefinition } from 'src/app/features/shared/api-models';
import { getUsersFeatureSlice$ } from '../users';

/**
 * Get absence definitions state
 */
const getAbsenceDefinitionsState$ = createSelector(
  getUsersFeatureSlice$,
  (state) => state.absence_definitions
);

/**
 * Get absence definition
 */
/**
 * @description
 * Get absence definition entities
 */
const getAbsenceDefinitionsEntities$ = createSelector(
  getAbsenceDefinitionsState$,
  (state) => state.entities
);

/**
 * @description
 * Get absence definition list
 */
const getUsersRawList$ = createSelector(
  getAbsenceDefinitionsEntities$,
  (entities) => {
    return Object.keys(entities).map(
      (key) => entities[key]
    ) as IAbsenceDefinition[];
  }
);

/**
 * @description
 * Get absence definition list
 */
export const getAbsenceDefinitionsList$ = createSelector(
  getUsersRawList$,
  (list) => {
    if (!list) {
      return [];
    }

    return list;
  }
);
