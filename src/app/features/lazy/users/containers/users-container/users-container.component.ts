import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { filter, Observable } from 'rxjs';
import {
  EnvironmentService,
  GlobalNavigationService,
  I18nService,
  IDevice,
  ILocalization,
  SidenavStatus,
} from 'src/app/core';
import { ISearch } from 'src/app/features/shared/data-settings';
import { ModuleInitService } from '../../services';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersContainerComponent implements OnInit {
  activeLocalization$!: Observable<ILocalization | null>;
  deviceEnvironment$!: Observable<IDevice | null>;
  sidenavStatus$!: Observable<SidenavStatus>;

  constructor(
    private _environmentService: EnvironmentService,
    private _globalNavigationService: GlobalNavigationService,
    private _I18nService: I18nService,
    private _moduleInitService: ModuleInitService
  ) {
    this.activeLocalization$ = this._I18nService.activeLocalization$;
    this.deviceEnvironment$ = this._environmentService.deviceEnvironment$;

    this.sidenavStatus$ =
      this._globalNavigationService.applicationSidenavStatus$;
  }

  ngOnInit(): void {
    this._moduleInitService.initModule();
  }

  searchChanged(search: ISearch): void {}
}
