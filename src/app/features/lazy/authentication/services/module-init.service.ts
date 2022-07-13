import { Injectable } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import {
  BaseService,
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
  constructor(private _I18nService: I18nService) {
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
            'authentication'
          );

          this.loadLocalizationDispatched = {
            dispatched: true,
            localization: activeLocale.signature,
          };
        });
  }

  teardownModule(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
