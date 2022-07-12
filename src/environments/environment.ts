// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import packageJson from '../../package.json';

import { IApplicationInitOptions } from 'src/app/core/models';

export const environment: IApplicationInitOptions = {
  applicationName: 'test.all-hours-app',
  applicationVersion: packageJson.version,
  identityConfiguration: {
    identityProvider: 'NONE',
    redirectQueryParamsAfterSuccessfulAuthentication: null,
    redirectUrlAfterSuccessfulAuthentication: [],
    resetPasswordUrl: [],
  },
  loggingLevel: 'DEBUG',
  production: false,
  selectedTheme: {
    class: 'all-hours-light-theme',
    icon: 'emoji_objects',
    logoInContrastColor: '',
    logoInPrimaryColor: '',
    phraseId: 'theme-switch-1',
    type: 'LIGHT',
  },
  supportedLocalizations: ['en-US', 'sl-SI'],
  supportedThemes: [
    {
      class: 'all-hours-light-theme',
      icon: 'emoji_objects',
      logoInContrastColor: '',
      logoInPrimaryColor: '',
      phraseId: 'theme-switch-1',
      type: 'LIGHT',
    },
    {
      class: 'all-hours-dark-theme',
      icon: 'nights_stay',
      logoInContrastColor: '',
      logoInPrimaryColor: '',
      phraseId: 'theme-switch-2',
      type: 'DARK',
    },
  ],
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
