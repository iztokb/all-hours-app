import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IApplicationState, ITheme } from '../models';
import { getSelectedTheme$ } from '../store';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService extends BaseService {
  /**
   * PUBLIC API
   * Expose all selectors that are relevant to the application settings as
   * plain observables so modules that don't use @ngrx/store can access those
   * settings
   */
  /**
   * @description
   * Active theme
   */
  activeTheme$!: Observable<ITheme | null>;

  constructor(private _store: Store<IApplicationState>) {
    super();

    this.activeTheme$ = this._store.pipe(select(getSelectedTheme$));
  }
}
