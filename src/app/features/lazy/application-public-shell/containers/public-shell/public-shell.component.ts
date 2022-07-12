import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  EnvironmentService,
  IConfigurationProperties,
  IDevice,
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
    private _settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.configuration$ = this._settingsService.applicationConfiguration$;
    this.deviceEnvironment$ = this._enironmentService.deviceEnvironment$;

    this.nextTheme$ = this._settingsService.nextTheme$;
  }

  themeChanged(theme: ITheme): void {
    this._settingsService.changeTheme(theme);
  }
}
