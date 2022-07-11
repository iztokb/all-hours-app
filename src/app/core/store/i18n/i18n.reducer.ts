import { createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import {
  Ii18nPhrase,
  Ii18nState,
  ILocalization,
  ILocalizationState,
  SupportedLocalizations,
} from '../../models';
import { SUPPORTED_LOCALIZATIONS_LIST } from '../../utils';
import * as i18nActions from './i18n.actions';

export const i18nAdapterDE = createEntityAdapter<Ii18nPhrase>({
  selectId: (phraseRecord: Ii18nPhrase) =>
    `${phraseRecord.module}-${phraseRecord.id}`,
  sortComparer: false,
});

const I18N_INITIAL_STATE_DE: ILocalizationState = i18nAdapterDE.getInitialState(
  {
    loaded: false,
    loading: false,
  }
);

export const i18nAdapterEN = createEntityAdapter<Ii18nPhrase>({
  selectId: (phraseRecord: Ii18nPhrase) =>
    `${phraseRecord.module}-${phraseRecord.id}`,
  sortComparer: false,
});

const I18N_INITIAL_STATE_EN: ILocalizationState = i18nAdapterEN.getInitialState(
  {
    loaded: false,
    loading: false,
  }
);

export const i18nAdapterSL = createEntityAdapter<Ii18nPhrase>({
  selectId: (phraseRecord: Ii18nPhrase) =>
    `${phraseRecord.module}-${phraseRecord.id}`,
  sortComparer: false,
});

const I18N_INITIAL_STATE_SL: ILocalizationState = i18nAdapterSL.getInitialState(
  {
    loaded: false,
    loading: false,
  }
);

export const I18N_INITIAL_STATE: Ii18nState = {
  activeLocalization: null,
  availableLocalizations: SUPPORTED_LOCALIZATIONS_LIST,
  localizations: {
    de_DE: I18N_INITIAL_STATE_DE,
    en_US: I18N_INITIAL_STATE_EN,
    sl_SI: I18N_INITIAL_STATE_SL,
  },
};

export const I18nReducer = createReducer(
  I18N_INITIAL_STATE,
  on(i18nActions.LoadLocalizationAction, (state, payload) => {
    const activeLanguage = payload.localization;

    switch (activeLanguage) {
      case 'de-DE': {
        return {
          ...state,
          localizations: {
            ...state.localizations,
            de_DE: {
              ...state.localizations.de_DE,
              loaded: false,
              loading: true,
            },
          },
        };
      }

      case 'en-US': {
        return {
          ...state,
          localizations: {
            ...state.localizations,
            en_US: {
              ...state.localizations.en_US,
              loaded: false,
              loading: true,
            },
          },
        };
      }

      case 'sl-SI': {
        return {
          ...state,
          localizations: {
            ...state.localizations,
            sl_SI: {
              ...state.localizations.sl_SI,
              loaded: false,
              loading: true,
            },
          },
        };
      }

      default: {
        return state;
      }
    }
  }),
  on(i18nActions.LoadLocalizationFailedAction, (state, payload) => {
    const activeLanguage = state.activeLocalization;
    switch (activeLanguage?.signature) {
      case 'de-DE': {
        return {
          ...state,
          localizations: {
            ...state.localizations,
            de_DE: {
              ...state.localizations.de_DE,
              loaded: false,
              loading: false,
            },
          },
        };
      }

      case 'en-US': {
        return {
          ...state,
          localizations: {
            ...state.localizations,
            en_US: {
              ...state.localizations.en_US,
              loaded: false,
              loading: false,
            },
          },
        };
      }

      case 'sl-SI': {
        return {
          ...state,
          localizations: {
            ...state.localizations,
            sl_SI: {
              ...state.localizations.sl_SI,
              loaded: false,
              loading: false,
            },
          },
        };
      }

      default: {
        return state;
      }
    }
  }),
  on(i18nActions.LoadLocalizationSuccessAction, (state, payload) => {
    const activeLanguage = payload.localization;

    if (!payload || !payload?.phraseList) {
      return state;
    }

    switch (activeLanguage) {
      case 'de-DE': {
        const localizationState: ILocalizationState = {
          entities: state.localizations.de_DE.entities,
          ids: state.localizations.de_DE.ids,
          loaded: true,
          loading: false,
        };

        return {
          ...state,
          localizations: {
            ...state.localizations,
            de_DE: i18nAdapterDE.upsertMany(
              payload.phraseList,
              localizationState
            ),
          },
        };
      }

      case 'en-US': {
        const localizationState: ILocalizationState = {
          entities: state.localizations.en_US.entities,
          ids: state.localizations.en_US.ids,
          loaded: true,
          loading: false,
        };

        return {
          ...state,
          localizations: {
            ...state.localizations,
            en_US: i18nAdapterEN.upsertMany(
              payload.phraseList,
              localizationState
            ),
          },
        };
      }

      case 'sl-SI': {
        const localizationState: ILocalizationState = {
          entities: state.localizations.sl_SI.entities,
          ids: state.localizations.sl_SI.ids,
          loaded: true,
          loading: false,
        };

        return {
          ...state,
          localizations: {
            ...state.localizations,
            sl_SI: i18nAdapterSL.upsertMany(
              payload.phraseList,
              localizationState
            ),
          },
        };
      }

      default: {
        return state;
      }
    }
  }),
  on(i18nActions.SetLocalizationAction, (state, payload) => {
    const localizationSignature: SupportedLocalizations = payload.localization;
    let resolveActiveLocalization: ILocalization | undefined =
      SUPPORTED_LOCALIZATIONS_LIST.find(
        (item) => item.signature === localizationSignature
      );

    if (!resolveActiveLocalization) {
      resolveActiveLocalization = {
        disabled: false,
        globalName: 'english',
        signature: 'en-US',
        value: 'english',
        visible: true,
      } as ILocalization;
    }

    return {
      ...state,
      activeLocalization: resolveActiveLocalization as ILocalization,
    };
  })
);
