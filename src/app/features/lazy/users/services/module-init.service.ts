import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import {
  BaseService,
  I18nService,
  IApplicationState,
  IInitModule,
  ILoadLocalizationDispatched,
} from 'src/app/core';
import {
  LoadAbsenceDefinitionsAction,
  LoadUsersAction,
  ResetUsersStoreSliceAction,
} from '../store';

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
        this._I18nService.loadModuleLocalizations(activeLocale, 'users');

        this.loadLocalizationDispatched = {
          dispatched: true,
          localization: activeLocale.signature,
        };
      });

    this._store.dispatch(LoadUsersAction());
    this._store.dispatch(LoadAbsenceDefinitionsAction());
  }

  teardownModule(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());

    this._store.dispatch(ResetUsersStoreSliceAction());
  }
}
