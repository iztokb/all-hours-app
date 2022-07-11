import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Ii18nState, IQueryLocalizations } from '../../models';
import { getApplicationConfiguration$ } from '../settings';
import * as fromI18n from './i18n.reducer';

const getI18nFeatureSlice$ = createFeatureSelector<Ii18nState>('i18n');

/**
 * @description
 * Get currently selected localization
 */
export const geti18nActiveLocalization$ = createSelector(
  getI18nFeatureSlice$,
  (state: Ii18nState) => state.activeLocalization
);

/**
 * @description
 * Get list of supported localizations
 */
export const geti18nSupportedLocalizations$ = createSelector(
  getI18nFeatureSlice$,
  (state: Ii18nState) => state.availableLocalizations
);

/**
 * @description
 * Get list of available localizations for given app
 */
export const geti18nAvailableLocalizations$ = createSelector(
  getI18nFeatureSlice$,
  getApplicationConfiguration$,
  (state, environment) => {
    const availableLocalizationsForApp = environment?.supportedLocalizations
      ? environment.supportedLocalizations
      : [];

    return state.availableLocalizations.filter((item) =>
      availableLocalizationsForApp.some((record) => record === item.signature)
    );
  }
);

/**
 * @description
 * Get information if i18n is loaded
 */
export const geti18nLoaded$ = (props: IQueryLocalizations) =>
  createSelector(getI18nFeatureSlice$, (state) => {
    const localization = props.localization;

    if (!localization) {
      return null;
    }

    switch (localization) {
      case 'en-US': {
        return state.localizations.en_US.loaded;
      }
      case 'sl-SI': {
        return state.localizations.sl_SI.loaded;
      }

      default: {
        return null;
      }
    }
  });

/**
 * @description
 * Get information if localization is loading
 */
export const geti18nLoading$ = (props: IQueryLocalizations) =>
  createSelector(getI18nFeatureSlice$, (state: Ii18nState) => {
    const localization = props.localization;

    if (!localization) {
      return null;
    }

    switch (localization) {
      case 'en-US': {
        return state.localizations.en_US.loading;
      }
      case 'sl-SI': {
        return state.localizations.sl_SI.loading;
      }

      default: {
        return null;
      }
    }
  });

/**
 * @description
 * Get i18n entities
 */
export const geti18nEntities$ = createSelector(
  getI18nFeatureSlice$,
  (state: Ii18nState) => {
    const localization = state.activeLocalization?.signature;

    if (!localization) {
      return null;
    }

    switch (localization) {
      case 'de-DE': {
        return state.localizations.de_DE.entities;
      }
      case 'en-US': {
        return state.localizations.en_US.entities;
      }
      case 'sl-SI': {
        return state.localizations.sl_SI.entities;
      }

      default: {
        return null;
      }
    }
  }
);

/**
 * @description
 * Get i18n list
 */
export const geti18nList$ = createSelector(geti18nEntities$, (entities) => {
  if (!entities) {
    return null;
  }
  return Object.keys(entities).map((key) => entities[key]);
});

/**
 * @description
 * Get i18n entities by Id
 */
export const geti18nEntitiesById$ = (props: string[]) =>
  createSelector(geti18nEntities$, (entities) => {
    if (!entities) {
      return null;
    }

    const searchedPhrasesIds: string[] = props;

    const searchedPhrases: string[] = [];

    searchedPhrasesIds.forEach((id) => {
      const phrase =
        typeof entities[id]?.phrase === 'undefined' ? '' : entities[id]?.phrase;

      searchedPhrases.push(phrase as unknown as string);
    });

    return searchedPhrases;
  });

export const getPhraseById$ = (phraseId: string) =>
  createSelector(geti18nEntities$, (entities) => {
    if (!entities || !phraseId || phraseId?.length === 0) {
      return null;
    }

    return entities[phraseId]?.phrase;
  });
