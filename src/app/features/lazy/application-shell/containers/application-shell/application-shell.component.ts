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
  SidenavStatus,
  GlobalNavigationService,
  IdentityService,
  IRoutableModule,
} from 'src/app/core';
import { ModuleInitService } from '../../services';

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

  /**
   * @description
   * Side menu items
   */
  sideMenuItems$!: Observable<IRoutableModule[]>;

  /**
   * @description
   * Sidenav status
   */
  sidenavStatus$!: Observable<SidenavStatus>;

  constructor(
    private _enironmentService: EnvironmentService,
    private _globalNavigationService: GlobalNavigationService,
    private _i18nService: I18nService,
    private _identityService: IdentityService,
    private _settingsService: SettingsService,
    private _moduleInitService: ModuleInitService
  ) {}

  ngOnInit(): void {
    this._moduleInitService.initModule();
    this.activeLocalization$ = this._i18nService.activeLocalization$;
    this.availableLocalizations$ = this._i18nService.availableLocalizations$;
    this.configuration$ = this._settingsService.applicationConfiguration$;
    this.deviceEnvironment$ = this._enironmentService.deviceEnvironment$;

    this.nextTheme$ = this._settingsService.nextTheme$;
    this.sideMenuItems$ = this._globalNavigationService.sideMenuItems$;
    this.sidenavStatus$ =
      this._globalNavigationService.applicationSidenavStatus$;
  }

  localizationChanged(locale: ILocalization): void {
    this._i18nService.setLocalization(locale);
  }

  logoutClicked(): void {
    this._identityService.logout();
  }

  themeChanged(theme: ITheme): void {
    this._settingsService.changeTheme(theme);
  }

  toggleSidenav(currentStatus: SidenavStatus) {
    this._globalNavigationService.toggleSidenavStatus(currentStatus);
  }
}
