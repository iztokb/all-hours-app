import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IApplicationSettingsState } from '../../models';
import * as fromSettings from './settings.reducer';

const getSettingsFeatureSlice$ =
  createFeatureSelector<IApplicationSettingsState>('settings');

/**
 * @description
 * Get application config
 */
export const getApplicationConfiguration$ = createSelector(
  getSettingsFeatureSlice$,
  (state) => state.configuration
);

/**
 * @description
 * Get initially requested route
 */
export const getInitialRoute$ = createSelector(
  getSettingsFeatureSlice$,
  (state) => state.initiallyRequestedRoute
);

/**
 * @description
 * Get application version
 */
export const getApplicationVersion$ = createSelector(
  getApplicationConfiguration$,
  (state) => {
    if (!state) {
      return null;
    }

    return state.applicationVersion;
  }
);

/**
 * @description
 * Get supported localizations
 */
export const getSupportedLocalizations$ = createSelector(
  getApplicationConfiguration$,
  (state) => {
    if (!state) {
      return [];
    }
    return state.supportedLocalizations;
  }
);

/**
 * @description
 * Get all themes
 */
export const getThemes$ = createSelector(
  getApplicationConfiguration$,
  (state) => {
    if (state?.themes) {
      return state.themes;
    } else {
      return [];
    }
  }
);

/**
 * @description
 * Get selected theme
 */
export const getSelectedTheme$ = createSelector(
  getApplicationConfiguration$,
  (settings) => {
    if (!settings) {
      return null;
    }
    return settings?.selectedTheme;
  }
);

/**
 * @description
 * Get next theme
 */
export const getNextTheme$ = createSelector(
  getThemes$,
  getSelectedTheme$,
  (themes, selectedTheme) => {
    if (!themes || !selectedTheme) {
      return null;
    }

    const currentThemeInList = themes.find(
      (theme) => theme.class === selectedTheme.class
    );

    if (!currentThemeInList) {
      return null;
    }

    const currentThemeIndex = themes.indexOf(currentThemeInList);

    const nextThemeIndex =
      currentThemeIndex === themes.length - 1 ? 0 : currentThemeIndex + 1;

    const nextTheme = themes[nextThemeIndex];

    return nextTheme;
  }
);
