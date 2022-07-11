import { createAction, props } from '@ngrx/store';
import { Ii18nPhrase, StorageType, SupportedLocalizations } from '../../models';

export const LoadLocalizationAction = createAction(
  '[i18n] Load localization phrases',
  props<{
    localization: SupportedLocalizations;
    currentLocalization: SupportedLocalizations;
    moduleSignature: string;
  }>()
);

export const LoadLocalizationFailedAction = createAction(
  '[i18n] Load localization phrases failed',
  props<{ error: any }>()
);

export const LoadLocalizationSuccessAction = createAction(
  '[i18n] Load localization phrases success',
  props<{
    localization: SupportedLocalizations;
    phraseList: Ii18nPhrase[] | null;
  }>()
);

export const ResolveLocalizationAction = createAction(
  '[i18n] Resolve localization',
  props<{
    storageKey: string;
    browserLanguage: string;
    acceptedLanguages: string[];
  }>()
);

export const SetLocalizationAction = createAction(
  '[i18n] Set localization',
  props<{ localization: SupportedLocalizations }>()
);

export const StoreLocalizationAction = createAction(
  '[i18n] Store localization',
  props<{ storage: StorageType; localization: SupportedLocalizations }>()
);
