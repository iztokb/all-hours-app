import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EnvironmentService, ThemeService } from './core';
import { IApplicationState, IBrowser, ITheme } from './core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'all-hours-app';

  browser$!: Observable<IBrowser | null>;

  selectedTheme$!: Observable<ITheme | null | undefined>;

  constructor(
    private _environmentService: EnvironmentService,
    private _themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.browser$ = this._environmentService.browserEnvironment$;

    this.selectedTheme$ = this._themeService.activeTheme$;
  }
}
