import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import {
  IApplicationSettingsState,
  IConfigurationProperties,
} from '../../models';
import * as settingsActions from './settings.actions';

export const APPLICATION_SETTINGS_INITIAL_STATE: IApplicationSettingsState = {
  configuration: null,
  initiallyRequestedRoute: {
    params: null,
    queryParams: null,
    url: [],
  },
};

export const SettingsReducer = createReducer(
  APPLICATION_SETTINGS_INITIAL_STATE,
  on(settingsActions.SetConfigurationAction, (state, payload) => {
    const configuration: IConfigurationProperties = {
      applicationName: payload?.applicationInitOptions?.applicationName,
      applicationVersion: payload?.applicationInitOptions?.applicationVersion,
      identityConfiguration:
        payload?.applicationInitOptions?.identityConfiguration,
      loggingLevel: payload?.applicationInitOptions?.loggingLevel,
      production: payload?.applicationInitOptions?.production,
      selectedTheme: payload?.applicationInitOptions?.selectedTheme,
      supportedLocalizations:
        payload?.applicationInitOptions?.supportedLocalizations,
      themes: payload?.applicationInitOptions?.supportedThemes,
    };

    return {
      ...state,
      configuration,
    };
  }),
  on(settingsActions.SetInititallyRequestedRouteAction, (state, payload) => {
    return {
      ...state,
      initiallyRequestedRoute: payload.redirectedFrom,
    };
  }),
  on(settingsActions.SwitchThemeAction, (state, payload) => {
    if (!state || !state.configuration) {
      return state;
    }

    const currentSettings: IConfigurationProperties = state.configuration;

    const newSettingsProps: IConfigurationProperties = {
      ...currentSettings,
      selectedTheme: payload.currentTheme,
    };

    const newState: IApplicationSettingsState = {
      ...state,
      configuration: newSettingsProps,
    };

    return newState;
  })
);
