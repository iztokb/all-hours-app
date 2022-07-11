import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IRouterState } from '../../models';
import * as fromRouter from '@ngrx/router-store';

const routerFeatureSlice$ =
  createFeatureSelector<fromRouter.RouterReducerState<IRouterState>>('router');

/**
 * @description
 * Get router state
 */
export const getRouterState$ = createSelector(
  routerFeatureSlice$,
  (state) => state.state
);

/**
 * @description
 * Get router navigation id
 */
export const getRouterNavigationId$ = createSelector(
  routerFeatureSlice$,
  (state) => state.navigationId
);
