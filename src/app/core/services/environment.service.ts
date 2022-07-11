import { Injectable } from '@angular/core';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { select, Store } from '@ngrx/store';
import { filter, fromEvent, map, Observable } from 'rxjs';
import {
  IApplicationState,
  IBrowser,
  IDevice,
  IScreenProperties,
  ScreenSizeCategory,
} from '../models';
import { getBrowserEnvironment$, getDeviceEnvironment$ } from '../store';
import { BaseService } from './base.service';
import {
  ResolveBrowserName,
  ResolveScreenProperties,
  ResolveViewportSize,
} from '../utils';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService extends BaseService {
  /**
   * PUBLIC API
   * Expose all selectors that are relevant to the application settings as
   * plain observables so modules that don't use @ngrx/store can access those
   * settings
   */
  /**
   * @description
   * Browser environment stream of IBrowser shape
   */
  browserEnvironment$!: Observable<IBrowser | null>;

  /**
   * @description
   * Device environment stream of IDevice shape
   */
  deviceEnvironment$!: Observable<IDevice | null>;

  /**
   * @description
   * Screen resize stream of IScreenProperties shape
   */
  screenResizeEvent$!: Observable<IScreenProperties>;

  /**
   *
   */

  /**
   * OTHER PROPS
   */
  offlineEvent$!: Observable<Event>;
  onlineEvent$!: Observable<Event>;

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private _store: Store<IApplicationState>
  ) {
    super();

    this.browserEnvironment$ = this._store.pipe(select(getBrowserEnvironment$));

    this.deviceEnvironment$ = this._store.pipe(select(getDeviceEnvironment$));

    // Subscribe to the screen resizing
    this.screenResizeEvent$ = this._breakpointObserver
      .observe([Breakpoints.Handset, Breakpoints.Tablet, Breakpoints.Web])
      .pipe(
        filter((stream) => stream.matches === true),
        map((_result: BreakpointState) => {
          let viewportSize: ScreenSizeCategory = 'WEB';

          Object.keys(_result.breakpoints).forEach((key) => {
            const isMediaQueryActive = _result.breakpoints[key];

            if (isMediaQueryActive) {
              const resolvedViewportSize = ResolveViewportSize(key);

              viewportSize = resolvedViewportSize;
            }
          });

          const browserName = ResolveBrowserName();

          const screenProps = ResolveScreenProperties(
            browserName,
            viewportSize
          );

          return screenProps;
        })
      );

    this.onlineEvent$ = fromEvent(window, 'online');
    this.offlineEvent$ = fromEvent(window, 'offline');
  }
}
