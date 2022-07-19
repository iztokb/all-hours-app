import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject } from 'rxjs';
import {
  ISearch,
  ILoadDataOnDemand,
  IProvidedPeriodChooser,
} from '../../models';

@Component({
  selector: 'app-data-settings',
  templateUrl: './data-settings.component.html',
  styleUrls: ['./data-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSettingsComponent implements OnInit {
  /**
   * OUTPUTS
   */
  /**
   * @description
   */
  @Output() loadData: EventEmitter<ILoadDataOnDemand> =
    new EventEmitter<ILoadDataOnDemand>();
  /**
   * @description
   * Emitted when search changes
   */
  @Output() searchHasChanged: EventEmitter<ISearch> =
    new EventEmitter<ISearch>();

  /**
   * INPUTS
   */
  /**
   * @description
   * List title. Defaults to empty string
   */
  @Input() listTitle: string = '';

  /**
   * @description
   * List subtitle. Usually this is record count. Defaults to empty string
   */
  @Input() listSubtitle: string = '';

  /**
   * @description
   * Externally provided search string.
   */
  private _providedSearchValue: ISearch | null = null;
  @Input()
  set providedSearchValue(value: ISearch | null) {
    this._providedSearchValue = value;

    this._localSearchState = value;
  }
  get providedSearchValue() {
    return this._providedSearchValue;
  }

  /**
   * @description
   * Record count. Defaults to undefined
   */
  @Input() recordCount: number | undefined;

  /**
   * @description
   * Provided value for period chooser
   */
  private _providedPeriodChooserValue!: IProvidedPeriodChooser;
  @Input()
  set providedPeriodChooserValue(value: IProvidedPeriodChooser) {
    this._providedPeriodChooserValue = value;

    this._populatePeriodFormWithData(value);
  }
  get providedPeriodChooserValue() {
    return this._providedPeriodChooserValue;
  }

  /**
   * @description
   * Show period chooser. Defaults to false
   */
  @Input() showPeriodChooser: boolean = false;

  /**
   * OTHER PROPS
   */
  form!: FormGroup;

  private _unsubscribe: Subject<void> = new Subject<void>();
  private _localSearchState: ISearch | null = null;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (!this.form) {
      this.form = this.createForm();
    }
  }
  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  searchChanged(search: ISearch): void {
    // Set local state
    this._localSearchState = search;

    this.searchHasChanged.emit(search);
  }

  protected createForm(): FormGroup {
    return this._formBuilder.group({
      from: new FormControl<Date | null>(null, [Validators.required]),
      to: new FormControl<Date | null>(null, [Validators.required]),
    });
  }

  loadDataClicked(): void {
    // Prepare date filters
    const from: Date | null = this.form.get('from')?.value;
    const to: Date | null = this.form.get('to')?.value;

    if (!from || !to) {
      return;
    }

    // Modify end of period to include entire to day
    to.setHours(23);
    to.setMinutes(59);
    to.setSeconds(59);

    const payload: ILoadDataOnDemand = {
      from: from,
      search: this._localSearchState?.search
        ? this._localSearchState.search
        : '',
      to: to,
    };

    this.loadData.emit(payload);
  }

  private _populatePeriodFormWithData(providedData: IProvidedPeriodChooser) {
    if (!this.form) {
      this.form = this.createForm();
    }

    this.form.setValue({
      from: providedData.from,
      to: providedData.to,
    });
  }
}
