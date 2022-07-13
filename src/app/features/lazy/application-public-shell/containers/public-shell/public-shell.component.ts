import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import {
  EnvironmentService,
  I18nService,
  IConfigurationProperties,
  IDevice,
  ILocalization,
  ITheme,
  SettingsService,
} from 'src/app/core';

@Component({
  selector: 'app-public-shell',
  templateUrl: './public-shell.component.html',
  styleUrls: ['./public-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PublicShellComponent implements OnInit {
  /**
   * @description
   * Active localization
   */
  activeLocalization$!: Observable<ILocalization | null>;

  /**
   * @description
   * Available localizations
   */
  availableLocalizations$!: Observable<ILocalization[]>;

  /**
   * @description
   * Application configuration
   */
  configuration$!: Observable<IConfigurationProperties | null>;

  /**
   * @description
   * Device environment
   */
  deviceEnvironment$!: Observable<IDevice | null>;

  /**
   * @description
   * Next theme
   */
  nextTheme$!: Observable<ITheme | null>;

  constructor(
    private _enironmentService: EnvironmentService,
    private _i18nService: I18nService,
    private _settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.activeLocalization$ = this._i18nService.activeLocalization$.pipe(
      tap((s) => console.log('active locale', s))
    );
    this.availableLocalizations$ =
      this._i18nService.availableLocalizations$.pipe(
        tap((s) => console.log('available locale', s))
      );
    this.configuration$ = this._settingsService.applicationConfiguration$;
    this.deviceEnvironment$ = this._enironmentService.deviceEnvironment$;

    this.nextTheme$ = this._settingsService.nextTheme$;
  }

  localizationChanged(locale: ILocalization): void {
    this._i18nService.setLocalization(locale);
  }

  themeChanged(theme: ITheme): void {
    this._settingsService.changeTheme(theme);
  }
}
