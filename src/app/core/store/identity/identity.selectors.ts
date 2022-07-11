import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IIdentityState } from '../../models';

export const getIdentityFeatureSlice$ =
  createFeatureSelector<IIdentityState>('identity');

/**
 * @description
 * Get authenticated identity
 */
export const getAuthenticatedIdentity$ = createSelector(
  getIdentityFeatureSlice$,
  (state) => state.authenticated
);

/**
 * @description
 * Get info if resolving identity is in progress
 */
export const getResolvingAuthenticatedIdentityInProgress$ = createSelector(
  getIdentityFeatureSlice$,
  (state) => state.resolvingAuthenticatedIdentity
);

/**
 * @description
 * Get public identity
 */
export const getPublicIdentity$ = createSelector(
  getIdentityFeatureSlice$,
  (state) => state.public
);
