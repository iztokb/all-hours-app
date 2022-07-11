import { SupportedLocalizations } from './i18n.model';
import { IIdentityConfiguration } from './identity.model';
import { LogType } from './logger.model';
import { IReferredFrom } from './router.model';

/**
 * @type ThemeType
 * @description
 * Type representing theme type
 */
export type ThemeType = 'LIGHT' | 'DARK';

/**
 * @interface IApplicationSettingsState
 * @description
 * Interface representing application environment properties
 */
export interface IApplicationSettingsState {
  configuration: IConfigurationProperties | null;
  initiallyRequestedRoute: IReferredFrom | null;
}

/**
 * @interface IConfigurationProperties
 * @description
 * Interface used in environment files
 */
export interface IConfigurationProperties {
  applicationName: string;
  applicationVersion: string;
  identityConfiguration: IIdentityConfiguration | null;
  loggingLevel: LogType;
  production: boolean;
  selectedTheme: ITheme | null;
  supportedLocalizations: SupportedLocalizations[];
  themes: ITheme[];
}

/**
 * @interface ITheme
 * @description
 * Interface representing the theme record
 */
export interface ITheme {
  class: string;
  icon: string;
  phraseId: string;
  logoInContrastColor: string;
  logoInPrimaryColor: string;
  type: ThemeType;
}
