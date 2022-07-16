import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { filter, Observable } from 'rxjs';
import {
  EnvironmentService,
  GlobalNavigationService,
  I18nService,
  IApplicationState,
  IDevice,
  ILocalization,
  SidenavStatus,
} from 'src/app/core';
import { ISearch } from 'src/app/features/shared/data-settings';
import { IPopupData, IUser } from '../../models';
import { ModuleInitService } from '../../services';
import { getUsersList$, UsersSearchChangedAction } from '../../store';
import { PopUpContainerComponent } from '../pop-up-container/pop-up-container.component';

@Component({
  selector: 'app-users-container',
  templateUrl: './users-container.component.html',
  styleUrls: ['./users-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersContainerComponent implements OnInit, OnDestroy {
  activeLocalization$!: Observable<ILocalization | null>;
  deviceEnvironment$!: Observable<IDevice | null>;
  sidenavStatus$!: Observable<SidenavStatus>;
  usersList$!: Observable<IUser[]>;

  constructor(
    private _dialog: MatDialog,
    private _store: Store<IApplicationState>,
    private _environmentService: EnvironmentService,
    private _globalNavigationService: GlobalNavigationService,
    private _I18nService: I18nService,
    private _moduleInitService: ModuleInitService
  ) {
    this.activeLocalization$ = this._I18nService.activeLocalization$;
    this.deviceEnvironment$ = this._environmentService.deviceEnvironment$;

    this.sidenavStatus$ =
      this._globalNavigationService.applicationSidenavStatus$;

    this.usersList$ = this._store.pipe(select(getUsersList$));
  }

  ngOnInit(): void {
    this._moduleInitService.initModule();
  }

  ngOnDestroy(): void {
    this._moduleInitService.teardownModule();
  }

  openUserDetail(user: IUser, deviceEnvironment: IDevice): void {
    // Prepare dialog data
    const dialogConfig = new MatDialogConfig();

    // Prepare data to be passed to pop-up component
    const dialogData: IPopupData = {
      contentSignature: 'USER_FORM',
      payload: user,
    };

    const availableHeight = deviceEnvironment?.screen?.height
      ? deviceEnvironment.screen.height
      : 0;
    const availableWidth = deviceEnvironment?.screen?.width
      ? deviceEnvironment.screen.width
      : 0;

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.minHeight =
      deviceEnvironment.screen?.activeScreenSize === 'HANDSET'
        ? availableHeight * 0.9
        : deviceEnvironment?.screen?.activeScreenSize === 'TABLET'
        ? availableHeight * 0.7
        : availableHeight * 0.4;
    dialogConfig.minWidth =
      deviceEnvironment.screen?.activeScreenSize === 'HANDSET'
        ? availableWidth * 0.9
        : deviceEnvironment?.screen?.activeScreenSize === 'TABLET'
        ? availableWidth * 0.7
        : availableWidth * 0.25;

    dialogConfig.data = dialogData;

    // Just open the dialog. No need to subscribe to close stream as no output is expected for now.
    this._dialog.open(PopUpContainerComponent, dialogConfig);
  }

  searchChanged(emittedSearch: ISearch): void {
    this._store.dispatch(
      UsersSearchChangedAction({ search: emittedSearch.search })
    );
  }
}
