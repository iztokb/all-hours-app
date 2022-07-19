import { createSelector } from '@ngrx/store';
import { IAbsenceUser, IUser } from 'src/app/features/shared/api-models';
import { getAbsencesFeatureSlice$ } from '../absences/absences.selectors';

/**
 * @description
 * Get users state
 */
export const getUsersState$ = createSelector(
  getAbsencesFeatureSlice$,
  (state) => state.users
);

/**
 * @description
 * Get information if users request is done
 */
export const getUsersRequestDone$ = createSelector(
  getUsersState$,
  (state) => state.loaded
);

/**
 * @description
 * Get information if users request is in progress
 */
export const getUsersRequestInProgress$ = createSelector(
  getUsersState$,
  (state) => state.loading
);

/**
 * @description
 * Get users entities
 */
const getUsersEntities$ = createSelector(
  getUsersState$,
  (state) => state.entities
);

/**
 * @description
 * Get users list
 */
const getRawUsersList$ = createSelector(getUsersEntities$, (entities) => {
  return Object.keys(entities).map((key) => entities[key]) as IUser[];
});

/**
 * @description
 * Get users list as IAbsenceUser record
 */
export const getUsersListForSelect$ = createSelector(
  getRawUsersList$,
  (list) => {
    return list.map((record) => {
      const transformedItem: IAbsenceUser = {
        FirstName: record?.FirstName ? record?.FirstName : '',
        Id: record.Id,
        LastName: record?.LastName ? record.LastName : '',
        MiddleName: record?.MiddleName ? record.MiddleName : '',
      };

      return transformedItem;
    });
  }
);
