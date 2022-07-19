import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import {
  EnvironmentService,
  GlobalNavigationService,
  I18nService,
  IApplicationState,
  IDevice,
  ILocalization,
  SidenavStatus,
} from 'src/app/core';
import { IAbsence } from 'src/app/features/shared/api-models';
import { ISearch } from 'src/app/features/shared/data-settings';
import { PrepareEmptyAbsenceRecord } from 'src/app/features/shared/forms';
import { IPopupData, IUser, SupportedPopupContent, SupportedPopupContentSignatures } from '../../models';
import { ModuleInitService } from '../../services';
import { DeleteUserAction, getUsersList$, PostUserAbsenceAction, PostUserAction, UpdateUserAction, UsersSearchChangedAction } from '../../store';
import { PrepareEmptyUserRecord } from '../../utils';
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

  private _unsubscribe: Subject<void> = new Subject<void>;

  constructor(
    private _dialog: MatDialog,
    private _store: Store<IApplicationState>,
    private _environmentService: EnvironmentService,
    private _globalNavigationService: GlobalNavigationService,
    private _I18nService: I18nService,
    private _moduleInitService: ModuleInitService
  ) {
  }

  ngOnInit(): void {
    this._moduleInitService.initModule();

    this.activeLocalization$ = this._I18nService.activeLocalization$;
    this.deviceEnvironment$ = this._environmentService.deviceEnvironment$;

    this.sidenavStatus$ =
      this._globalNavigationService.applicationSidenavStatus$;

    this.usersList$ = this._store.pipe(select(getUsersList$));
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
    this._moduleInitService.teardownModule();
  }

  addAbsenceForUser(user: IUser, deviceEnvironment: IDevice): void {
    const emptyAbsenceRecord = PrepareEmptyAbsenceRecord();

    // Modify record with current user
    const modifiedRecord: IAbsence = {
      ...emptyAbsenceRecord,
      UserId: user.Id
    };

    // Prepare dialog data
    const dialogConfig = new MatDialogConfig();

    // Prepare data to be passed to pop-up component
    const dialogData: IPopupData = {
      contentSignature: 'ABSENCE_FORM',
      payload: modifiedRecord,
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
        ? availableHeight * 0.8
        : availableHeight * 0.55;
    dialogConfig.minWidth =
      deviceEnvironment.screen?.activeScreenSize === 'HANDSET'
        ? availableWidth * 0.9
        : deviceEnvironment?.screen?.activeScreenSize === 'TABLET'
        ? availableWidth * 0.7
        : availableWidth * 0.25;

    dialogConfig.data = dialogData;

    // Open the dialog.
    const dialogRef = this._dialog.open(PopUpContainerComponent, dialogConfig);

    // Subscribe to close event
    dialogRef
      .afterClosed()
      .pipe(
        filter((s) => s !== null),
        takeUntil(this._unsubscribe)
      )
      .subscribe((result: SupportedPopupContent) => {
        if (!result) {
          return;
        } else {
          const recordToBeSubmitted: IAbsence = result as unknown as IAbsence;
          this._store.dispatch(PostUserAbsenceAction({absence: recordToBeSubmitted}))
        }
      });

  }

  addNewUserClicked(deviceEnvironment: IDevice): void {
    const defaultUserRecord: IUser = PrepareEmptyUserRecord();

    // Prepare dialog data
    const dialogConfig = new MatDialogConfig();

    // Prepare data to be passed to pop-up component
    const dialogData: IPopupData = {
      contentSignature: 'USER_FORM',
      payload: defaultUserRecord,
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

    // Open the dialog.
    const dialogRef = this._dialog.open(PopUpContainerComponent, dialogConfig);

    // Subscribe to close event
    dialogRef
      .afterClosed()
      .pipe(
        filter((s) => s !== null),
        takeUntil(this._unsubscribe)
      )
      .subscribe((result: SupportedPopupContent) => {
        if (!result) {
          return;
        } else {
          console.log('Record to be submitted', result)
          const record: IUser = result as unknown as IUser;
          this._store.dispatch(PostUserAction({record}))
        }
      });

  }

  deleteUser(user: IUser): void {
    this._store.dispatch(DeleteUserAction({user}))
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

    // Open the dialog.
    const dialogRef = this._dialog.open(PopUpContainerComponent, dialogConfig);

    // Subscribe to close event
    dialogRef
      .afterClosed()
      .pipe(
        filter((s) => s !== null),
        takeUntil(this._unsubscribe)
      )
      .subscribe((result: SupportedPopupContent) => {
        if (!result) {
          return;
        } else {
          const recordToBeSubmitted: IUser = result as unknown as IUser;

          this._store.dispatch(UpdateUserAction({record: recordToBeSubmitted}))
        }
      });
  }

  searchChanged(emittedSearch: ISearch): void {
    this._store.dispatch(
      UsersSearchChangedAction({ search: emittedSearch.search })
    );
  }
}
