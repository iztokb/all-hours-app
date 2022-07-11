import { EntityState } from '@ngrx/entity';
import { ICatalogue } from './forms-base.model';

/**
 * @type SupportedLocalizations
 * @description
 * Available (supported) localization codes
 */
export type SupportedLocalizations = 'sl-SI' | 'en-US' | 'de-DE';

/**
 * @interface ILocalization
 * @description
 * Interface representing localization record
 */
export interface ILocalization extends ICatalogue {
  globalName: string;
  signature: SupportedLocalizations;
}

/**
 * @interface IQueryLocalizations
 * @description
 * Interface representing props object when querying localizations slice
 */
export interface IQueryLocalizations {
  localization: SupportedLocalizations;
}

/**
 * @interface Ii18nPhrase
 * @description
 * Interface representing i18n phrase as received from api
 */
export interface Ii18nPhrase {
  id: number;
  module: string;
  phrase: string;
}

/**
 * @interface ILocalizationState
 * @description
 * Interface representing localization state in store
 */
export interface ILocalizationState extends EntityState<Ii18nPhrase> {
  loading: boolean;
  loaded: boolean;
}

/**
 * @interface Ii18nState
 * @description
 * Interface representing i18n state in store
 */
export interface Ii18nState {
  activeLocalization: ILocalization | null;
  availableLocalizations: ILocalization[];
  localizations: {
    en_US: ILocalizationState;
    sl_SI: ILocalizationState;
    de_DE: ILocalizationState;
  };
}
