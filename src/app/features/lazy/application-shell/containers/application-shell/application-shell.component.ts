import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ILocalization,
  IDevice,
  IConfigurationProperties,
  ITheme,
  SettingsService,
  I18nService,
  EnvironmentService,
} from 'src/app/core';

@Component({
  selector: 'app-application-shell',
  templateUrl: './application-shell.component.html',
  styleUrls: ['./application-shell.component.scss'],
})
export class ApplicationShellComponent implements OnInit {
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
    this.activeLocalization$ = this._i18nService.activeLocalization$;
    this.availableLocalizations$ = this._i18nService.availableLocalizations$;
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
