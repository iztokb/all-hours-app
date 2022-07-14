import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  IApplicationInitOptions,
  IApplicationState,
  IInitApplication,
} from '../models';
import {
  ResolveAuthenticatedIdentityAction,
  ResolveBrowserAction,
  ResolveDeviceAction,
  ResolveThemeAction,
  SetConfigurationAction,
  SubscribeToOfflineChangesAction,
  SubscribeToOnlineChangesAction,
  SubscribeToScreenPropertyChangesAction,
} from '../store';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ApplicationInitService
  extends BaseService
  implements IInitApplication
{
  constructor(private _store: Store<IApplicationState>) {
    super();
  }

  initApplication(options: IApplicationInitOptions): void {
    console.log(
      `%c*** ©${new Date().getFullYear()} Application developed by Iztok Berdnik. All right reserved. ***`,
      'color: black; font-style: italic; background-color: #03a9f4;padding: 2px'
    );

    // Resolve configuration properties
    this._store.dispatch(
      SetConfigurationAction({ applicationInitOptions: options })
    );

    // Resolve device properties
    this._store.dispatch(ResolveDeviceAction());

    // Resolve browser properties
    this._store.dispatch(ResolveBrowserAction());

    // Subscribe to screen resizing
    this._store.dispatch(SubscribeToScreenPropertyChangesAction());

    // Subscribe to changes in connection
    this._store.dispatch(SubscribeToOfflineChangesAction());

    this._store.dispatch(SubscribeToOnlineChangesAction());

    // Resolve theme
    this._store.dispatch(
      ResolveThemeAction({
        defaultTheme: options.selectedTheme,
        storageKey: 'THEME',
        supportedThemes: options.supportedThemes,
      })
    );

    // Get core localization phrases when localization is resolved

    // Resolve current identity
    if (options?.identityConfiguration?.identityProvider) {
      const redirectUrl: string[] = options?.identityConfiguration
        ?.redirectUrlAfterSuccessfulAuthentication
        ? options.identityConfiguration.redirectUrlAfterSuccessfulAuthentication
        : [];
      this._store.dispatch(
        ResolveAuthenticatedIdentityAction({
          identityProvider: options?.identityConfiguration?.identityProvider,
          redirectUrl,
        })
      );
    }
  }
}
