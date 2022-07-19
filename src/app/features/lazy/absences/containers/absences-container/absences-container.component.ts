import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { ILocalization, SidenavStatus, IDevice, IApplicationState, EnvironmentService, GlobalNavigationService, I18nService } from 'src/app/core';
import { IAbsence } from 'src/app/features/shared/api-models';
import { ILoadDataOnDemand, IProvidedPeriodChooser, ISearch } from 'src/app/features/shared/data-settings';
import { IPopupData, SupportedPopupContent } from '../../models';
import { ModuleInitService } from '../../services';
import { AbsencesSearchChangedAction, LoadAbsencesAction, getAbsencesList$, DeleteAbsenceAction, UpdateAbsenceAction } from '../../store';
import { GetCurrentMonthStartAndEndDates } from '../../utils';
import { PopUpContainerComponent } from '../pop-up-container/pop-up-container.component';

@Component({
  selector: 'app-absences-container',
  templateUrl: './absences-container.component.html',
  styleUrls: ['./absences-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbsencesContainerComponent implements OnInit, OnDestroy {
  absencesList$!: Observable<IAbsence[]>;
  activeLocalization$!: Observable<ILocalization | null>;
  deviceEnvironment$!: Observable<IDevice | null>;
  sidenavStatus$!: Observable<SidenavStatus>;


  defaultPeriodChooseValue!: IProvidedPeriodChooser;

  private _unsubscribe: Subject<void> = new Subject<void>;

  constructor(private _dialog: MatDialog,
    private _store: Store<IApplicationState>,
    private _environmentService: EnvironmentService,
    private _globalNavigationService: GlobalNavigationService,
    private _I18nService: I18nService,private _moduleInitService: ModuleInitService) {}

  ngOnInit(): void {
    this._moduleInitService.initModule();
    this.absencesList$ = this._store.pipe(select(getAbsencesList$))
    this.activeLocalization$ = this._I18nService.activeLocalization$;
    this.deviceEnvironment$ = this._environmentService.deviceEnvironment$;

    this.sidenavStatus$ =
      this._globalNavigationService.applicationSidenavStatus$;

    this._setDefaultPeriod();

    this.loadData({
      from: this.defaultPeriodChooseValue.from,
      search: '',
      to: this.defaultPeriodChooseValue.to
    })
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
    this._moduleInitService.teardownModule();
  }

  deleteAbsence(absence: IAbsence): void {
    this._store.dispatch(DeleteAbsenceAction({absence}))
  }

  loadData(params: ILoadDataOnDemand) {
    this._store.dispatch(LoadAbsencesAction({
      params
    }))
  }

  openAbsenceDetail(absence: IAbsence, deviceEnvironment: IDevice): void {


    // Prepare dialog data
    const dialogConfig = new MatDialogConfig();

    // Prepare data to be passed to pop-up component
    const dialogData: IPopupData = {
      contentSignature: 'ABSENCE_FORM',
      payload: absence,
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
          console.log('Record to be submitted', result)
          const recordToBeSubmittted = result as unknown as IAbsence;
          this._store.dispatch(UpdateAbsenceAction({record: recordToBeSubmittted}))
        }
      });
  }

  searchChanged(emittedSearch: ISearch): void {
    this._store.dispatch(
      AbsencesSearchChangedAction({ search: emittedSearch.search })
    );
  }

  private _setDefaultPeriod() {
    const currentMonth = GetCurrentMonthStartAndEndDates(new Date());

    this.defaultPeriodChooseValue = {
      from: currentMonth.startOfMonth,
      to: currentMonth.endOfMonth
    }
  }
}
