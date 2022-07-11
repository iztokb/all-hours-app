import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IApplicationState, IBrowser, ITheme } from './core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'all-hours-app';

  browser$!: Observable<IBrowser | null>;

  selectedTheme$!: Observable<ITheme | null | undefined>;

  constructor(private _store: Store<IApplicationState>) {}
}
