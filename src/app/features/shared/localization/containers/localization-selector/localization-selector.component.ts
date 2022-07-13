import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ILocalization } from 'src/app/core';
import { LocalizationDisplayType } from '../../models';
import { ModuleInitService } from '../../services';

@Component({
  selector: 'app-localization-selector',
  templateUrl: './localization-selector.component.html',
  styleUrls: ['./localization-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalizationSelectorComponent implements OnInit {
  /**
   * OUTPUTS
   */
  /**
   * @description
   * An event emitted when user selects new localization
   */
  @Output() localizationChanged: EventEmitter<ILocalization> =
    new EventEmitter<ILocalization>();

  /**
   * INPUTS
   */
  /**
   * @description
   * Currently active localization
   */
  private _activeLocalization!: ILocalization | null;
  @Input()
  set activeLocalization(value: ILocalization | null) {
    this._activeLocalization = value;
  }
  get activeLocalization() {
    return this._activeLocalization;
  }

  /**
   * @description
   * List of available localizations
   */
  private _availableLocalizations!: ILocalization[] | null;
  @Input()
  set availableLocalizations(value: ILocalization[] | null) {
    this._availableLocalizations = value;
  }
  get availableLocalizations() {
    return this._availableLocalizations;
  }

  /**
   * @description
   * Property that determines how active localizations is presented.
   */
  private _displayWith!: LocalizationDisplayType;
  @Input()
  set displayWith(value: LocalizationDisplayType) {
    this._displayWith = value;
  }
  get displayWith() {
    return this._displayWith;
  }
  constructor(private _moduleInitService: ModuleInitService) {}

  ngOnInit(): void {
    this._moduleInitService.initModule();
  }

  localizationSelected(
    selectedLocalization: ILocalization,
    currentLocalization: ILocalization,
    availableLocalizations: ILocalization[]
  ): void {
    if (availableLocalizations?.length === 0) {
      // No available localizations are found (that shouldn't happen at all)
      throw new Error(
        'No localizations provided. At least one localization should be provided.'
      );
    } else if (availableLocalizations?.length === 1) {
      // Only one localization is supported. No need to emit anything
      return;
    } else if (availableLocalizations?.length === 2) {
      // Only two localizations are supported. Toggle to select other record
      const currentRecordIndex =
        availableLocalizations.indexOf(currentLocalization);

      const nextIndex = currentRecordIndex === 0 ? 1 : 0;
      const nextLocalization = availableLocalizations[nextIndex];

      this.localizationChanged.emit(nextLocalization);
      return;
    } else {
      // More then two localizations are available
      if (selectedLocalization.signature === currentLocalization.signature) {
        // User has selected currently selected localization. No need to do anything.
        return;
      }

      this.localizationChanged.emit(selectedLocalization);
    }
  }
}
