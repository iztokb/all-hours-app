import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { filter, Observable, Subject, takeUntil } from 'rxjs';
import { ILocalization, ScreenSizeCategory } from 'src/app/core';
import { ISearch } from '../../models';

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
   * OTHER PROPS
   */
  private _unsubscribe: Subject<void> = new Subject<void>();

  constructor() {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  searchChanged(search: ISearch): void {
    this.searchHasChanged.emit(search);
  }
}
