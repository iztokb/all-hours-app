import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IApplicationEnvironmentState } from '../../models';
import * as fromEnvironment from './environment.reducer';

const getEnvironmentFeatureSlice$ =
  createFeatureSelector<IApplicationEnvironmentState>('environment');

/**
 * @description
 * Get browser environment
 */
export const getBrowserEnvironment$ = createSelector(
  getEnvironmentFeatureSlice$,
  (state) => state?.browser
);

/**
 * @description
 * Get device environment
 */
export const getDeviceEnvironment$ = createSelector(
  getEnvironmentFeatureSlice$,
  (state) => state.device
);

/**
 * @description
 * Get device touch capabilities
 */
export const getIsDeviceWebTouchCapable$ = createSelector(
  getEnvironmentFeatureSlice$,
  (state) => {
    return (
      state?.device &&
      state.device?.touch?.capable === true &&
      state.device?.screen?.activeScreenSize === 'WEB'
    );
  }
);
