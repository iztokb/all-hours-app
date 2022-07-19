import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { ILocalization, SidenavStatus, IDevice, IApplicationState, EnvironmentService, GlobalNavigationService, I18nService } from 'src/app/core';
import { IAbsence } from 'src/app/features/shared/api-models';
import { ILoadDataOnDemand, IProvidedPeriodChooser, ISearch } from 'src/app/features/shared/data-settings';
import { ModuleInitService } from '../../services';
import { AbsencesSearchChangedAction, LoadAbsencesAction, getAbsencesList$ } from '../../store';
import { GetCurrentMonthStartAndEndDates } from '../../utils';

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

  loadData(params: ILoadDataOnDemand) {
    this._store.dispatch(LoadAbsencesAction({
      params
    }))
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
