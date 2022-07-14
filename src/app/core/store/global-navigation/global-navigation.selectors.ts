import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IGlobalNavigationState } from '../../models';

const getGlobalNavigationFeatureSlice$ =
  createFeatureSelector<IGlobalNavigationState>('global_navigation');

/**
 * @description
 * Get application side menu entities
 */
const getApplicationSideMenuEntities$ = createSelector(
  getGlobalNavigationFeatureSlice$,
  (state) => {
    return state.entities;
  }
);

/**
 * @description
 * Get application side menu search
 */
const getApplicationSideMenuSearch$ = createSelector(
  getGlobalNavigationFeatureSlice$,
  (state) => state.search
);

/**
 * @description
 * Get raw application side menu list
 */
const getApplicationSideMenuList$ = createSelector(
  getApplicationSideMenuEntities$,
  (entities) => {
    return Object.keys(entities).map((key) => entities[key]);
  }
);

/**
 * @description
 * Get application side menu items that are filtered by search
 */
export const getApplicationSideMenuItems$ = createSelector(
  getApplicationSideMenuList$,
  getApplicationSideMenuSearch$,
  (list, search) => {
    if (list === null || typeof list === 'undefined' || !list) {
      return [];
    }

    if (search.length === 0) {
      return list;
    }

    const searchRegEx = new RegExp(search, 'i');

    /**
     * In first step filter the list of main nodes, then filter those on 2nd level as well
     */
    const filteredList = list.filter((menuItem) => {
      // Check if main menu item fulfills the regex test
      const mainItemNameTest = searchRegEx.test(
        menuItem?.name ? menuItem.name : ''
      );

      /**
       * Assertions
       */
      return mainItemNameTest;
    });

    return filteredList && filteredList?.length > 0 ? filteredList : [];
  }
);

/**
 * @description
 * Get current sidenav status
 */
export const getApplicationSidenavStatus$ = createSelector(
  getGlobalNavigationFeatureSlice$,
  (state) => state.status
);
