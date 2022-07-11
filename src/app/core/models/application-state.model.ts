import { RouterReducerState } from '@ngrx/router-store';
import { IApplicationEnvironmentState } from './environment.model';
import { Ii18nState, SupportedLocalizations } from './i18n.model';
import { IIdentityConfiguration, IIdentityState } from './identity.model';
import { LogType } from './logger.model';
import { IRouterState } from './router.model';
import { IApplicationSettingsState, ITheme } from './settings.model';

/**
 * @interface IApplicationInitOptions
 * @description
 * Interface representing application bootstrap configuration object
 */
export interface IApplicationInitOptions {
  applicationName: string;
  applicationVersion: string;
  identityConfiguration: IIdentityConfiguration | null;
  loggingLevel: LogType;
  production: boolean;
  selectedTheme: ITheme;
  supportedLocalizations: SupportedLocalizations[];
  supportedThemes: ITheme[];
}

/**
 * @interface IApplicationState
 * @description
 * Interface representing the core state of any app
 */
export interface IApplicationState {
  environment: IApplicationEnvironmentState;
  i18n: Ii18nState;
  identity: IIdentityState;
  router: RouterReducerState<IRouterState>;
  settings: IApplicationSettingsState;
}
