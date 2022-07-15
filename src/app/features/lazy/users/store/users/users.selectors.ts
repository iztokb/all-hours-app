import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EscapeRegex } from 'src/app/core';
import { IUser, IUsersModulestate } from '../../models';

export const getUsersFeatureSlice$ =
  createFeatureSelector<IUsersModulestate>('users');

/**
 * @description
 * Get users state
 */
export const getUsersState$ = createSelector(
  getUsersFeatureSlice$,
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
 * Get active search
 */
const getUsersActiveSearch$ = createSelector(
  getUsersState$,
  (state) => state.activeSearch
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
const getUsersList$ = createSelector(getUsersEntities$, (entities) => {
  return Object.keys(entities).map((key) => entities[key]) as IUser[];
});

/**
 * @description
 * Get users list with applied filter by search term
 */
const getRealtimeFilteredList$ = createSelector(
  getUsersList$,
  getUsersActiveSearch$,
  (list, search) => {
    if (!list) {
      return null;
    }

    const searchPhrases = search.split(' ');

    // Go through search phrases and filter records
    const filteredList = list.filter((record) => {
      let recordMeetsCondition: boolean[] = [];

      searchPhrases.forEach((phrase) => {
        // Trim the phrase
        const trimmedPhrase = phrase.trim();

        // First thing first. Remove all chars that might break regex
        const safeString = EscapeRegex(phrase);

        const searchRegEx = new RegExp(safeString, 'i');

        // Prevent search null values
        const address = record?.Address ? record.Address : '';
        const city = record?.City ? record.City : '';
        const email = record?.Email ? record.Email : '';
        const fullName = record?.FullName ? record.FullName : '';

        const testResult: boolean =
          searchRegEx.test(record?.Id) === true ||
          searchRegEx.test(address) === true ||
          searchRegEx.test(city) === true ||
          searchRegEx.test(email) === true ||
          searchRegEx.test(fullName) === true;

        recordMeetsCondition.push(testResult);
      });

      return recordMeetsCondition.every((value) => value === true);
    });

    return filteredList;
  }
);
