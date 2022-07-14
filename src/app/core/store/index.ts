import {
  ActionReducerMap,
  createFeatureSelector,
  MetaReducer,
} from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';

import { IApplicationState, IRouterState } from '../models';
import { EnvironmentEffects, EnvironmentReducer } from './environment';
import {
  GlobalNavigationEffects,
  GlobalNavigationReducer,
} from './global-navigation';
import { I18nEffects, I18nReducer } from './i18n';
import { IdentityEffects, IdentityReducer } from './identity';
import { RouterEffects } from './router';
import { SettingsEffects, SettingsReducer } from './settings';

/**
 * REDUCERS
 */
export const CoreReducers: ActionReducerMap<IApplicationState> = {
  environment: EnvironmentReducer,
  global_navigation: GlobalNavigationReducer,
  i18n: I18nReducer,
  identity: IdentityReducer,
  router: fromRouter.routerReducer,
  settings: SettingsReducer,
};

/**
 * Export meta reducers
 */
export const MetaReducers: MetaReducer<IApplicationState>[] = [];

/**
 * EFFECTS
 */
export const CoreEffects = [
  EnvironmentEffects,
  GlobalNavigationEffects,
  I18nEffects,
  IdentityEffects,
  RouterEffects,
  SettingsEffects,
];

/**
 * PUBLIC API
 */
export * from './environment';
export * from './global-navigation';
export * from './i18n';
export * from './identity';
export * from './router';
export * from './settings';
