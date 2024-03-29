import { Injectable } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import {
  BaseService,
  GlobalNavigationService,
  I18nService,
  IInitModule,
  ILoadLocalizationDispatched,
} from 'src/app/core';

@Injectable({
  providedIn: 'root',
})
export class ModuleInitService
  extends BaseService
  implements IInitModule<void>
{
  loadLocalizationDispatched!: ILoadLocalizationDispatched;
  constructor(
    private _I18nService: I18nService,
    private _globalNavigationService: GlobalNavigationService
  ) {
    super();
  }

  initModule(): void {
    const localizationSubscription: Subscription =
      this._I18nService.activeLocalization$
        .pipe(filter((stream) => stream !== null))
        .subscribe((activeLocale) => {
          if (!activeLocale || typeof activeLocale === 'undefined') {
            return;
          }

          if (
            this.loadLocalizationDispatched?.dispatched &&
            this.loadLocalizationDispatched.localization ===
              activeLocale.signature
          ) {
            return;
          }
          this._I18nService.loadModuleLocalizations(
            activeLocale,
            'application-shell'
          );

          this.loadLocalizationDispatched = {
            dispatched: true,
            localization: activeLocale.signature,
          };

          // Get global navigation items
          this._globalNavigationService.loadSideMenuItemsForModule(
            activeLocale,
            'application-shell'
          );
        });
  }

  teardownModule(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
