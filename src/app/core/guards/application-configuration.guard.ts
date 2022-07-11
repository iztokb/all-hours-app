import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { environment } from '../../../environments/environment';
import { ApplicationInitService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class ApplicationConfigurationGuard implements CanActivate {
  alreadyRun: boolean = false;

  constructor(private _applicationInitService: ApplicationInitService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.alreadyRun) {
      return true;
    }

    // Bootstrap app
    this._applicationInitService.initApplication({
      applicationName: environment.applicationName,
      applicationVersion: environment.applicationVersion,
      identityConfiguration: environment.identityConfiguration,
      loggingLevel: environment.loggingLevel,
      production: environment.production,
      selectedTheme: environment.selectedTheme,
      supportedLocalizations: environment.supportedLocalizations,
      supportedThemes: environment.supportedThemes,
    });

    this.alreadyRun = true;
    return true;
  }
}
