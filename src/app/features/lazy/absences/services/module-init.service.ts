import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import {
  BaseService,
  I18nService,
  IApplicationState,
  IInitModule,
  ILoadLocalizationDispatched,
} from 'src/app/core';
import { ResetAbsencesStoreSliceAction } from '../store';

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
    private _store: Store<IApplicationState>
  ) {
    super();
  }

  initModule(options: void): void {
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
          this._I18nService.loadModuleLocalizations(activeLocale, 'absences');

          this.loadLocalizationDispatched = {
            dispatched: true,
            localization: activeLocale.signature,
          };
        });

    this.subscriptions.push(localizationSubscription);
  }

  teardownModule(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());

    this._store.dispatch(ResetAbsencesStoreSliceAction());
  }
}
