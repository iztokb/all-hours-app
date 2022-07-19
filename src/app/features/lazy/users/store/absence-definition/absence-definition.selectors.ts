import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICatalogue } from 'src/app/core';
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
 * Get raw absence definition list
 */
export const getRawAbsenceDefinitionsList$ = createSelector(
  getUsersRawList$,
  (list) => {
    if (!list) {
      return [];
    }

    return list;
  }
);

/**
 * @description
 * Get absences type list as ICatalogue record
 */
export const getAbsencesListForSelect$ = createSelector(
  getRawAbsenceDefinitionsList$,
  (list) => {
    return list.map((record) => {
      const transformedItem: ICatalogue = {
        disabled: false,
        signature: record.Id,
        value: record.CategoryDefinitionName,
        visible: true,
      };

      return transformedItem;
    });
  }
);
