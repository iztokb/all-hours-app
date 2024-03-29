import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  getApplicationSidenavStatus$,
  getApplicationSideMenuItems$,
  LoadSideMenuItemsAction,
  ToggleSideNavAction,
} from '../store';
import {
  IApplicationState,
  ILocalization,
  IRoutableModule,
  SidenavStatus,
} from '../models';

@Injectable({
  providedIn: 'root',
})
export class GlobalNavigationService {
  /**
   * PUBLIC API
   * Expose all selectors that are relevant to the application settings as
   * plain observables so modules that don't use @ngrx/store can access those
   * settings
   */
  /**
   * @description
   * Current sidenav status
   */
  applicationSidenavStatus$!: Observable<SidenavStatus>;

  /**
   * @description
   * Side menu items
   */
  sideMenuItems$!: Observable<IRoutableModule[]>;

  /**
   * @description
   * Load side menu items for module
   * @param { ILocalization } localization
   * @param { string} moduleSignature
   */
  loadSideMenuItemsForModule(
    localization: ILocalization,
    moduleSignature: string
  ): void {
    this._store.dispatch(
      LoadSideMenuItemsAction({
        localization,
        moduleSignature,
      })
    );
  }

  /**
   * @description
   * Toggle sidenav status
   * @param { SidenavStatus } currentStatus
   */
  toggleSidenavStatus(currentStatus: SidenavStatus): void {
    const newStatus: SidenavStatus =
      currentStatus === 'OPENED' ? 'CLOSED' : 'OPENED';

    this._store.dispatch(ToggleSideNavAction({ newStatus: newStatus }));
  }

  constructor(private _store: Store<IApplicationState>) {
    this.applicationSidenavStatus$ = this._store.pipe(
      select(getApplicationSidenavStatus$)
    );

    this.sideMenuItems$ = this._store.pipe(
      select(getApplicationSideMenuItems$)
    );
  }
}
