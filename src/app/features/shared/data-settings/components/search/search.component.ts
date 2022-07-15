import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subscription } from 'rxjs';
import { ISearch } from '../../models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  /**
   * OUTPUTS
   */
  /**
   * @description
   * Form output
   */
  @Output()
  searchValue: EventEmitter<ISearch> = new EventEmitter<ISearch>();

  /**
   * INPUTS
   */
  /**
   * @decription
   * Debaounce time in milliseconds. Defaults to 500.
   */
  @Input() debounceTime = 500;

  /**
   * @description
   * Search field hint. Defaults to empty string.
   */
  @Input() hint: string = '';

  /**
   * @description
   * Search field placeholder. Defaults to empty string.
   */
  @Input() placeholder: string = '';

  /**
   * @description
   * Set value of the search component from parent component. Defaults to null
   */
  private _providedSearchValue: ISearch | null = null;
  @Input()
  set providedSearchValue(value: ISearch | null) {
    this._providedSearchValue = value;

    if (!this.form) {
      this.form = this._createForm();
    }

    this._populateForm(value);
  }
  get providedSearchValue() {
    return this._providedSearchValue;
  }

  /**
   * @description
   * Prop that determines if show archive checkbox is visible or not. Defaults to false
   */
  @Input() showArchiveCheckboxVisible: boolean = true;

  /**
   * OTHER PROPS
   */

  /**
   * @description
   * Form object. Required by IForm interface
   */
  form!: FormGroup;

  private _subscriptions: Subscription[] = [];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (!this.form) {
      this.form = this._createForm();
    }

    // Subscribe to changes in form
    const searchFormValueSubscription = this.form.valueChanges
      .pipe(debounceTime(this.debounceTime))
      .subscribe((formValuesStream: ISearch) => {
        // Trigger event emitter
        this.searchValue.emit(formValuesStream);
      });

    this._subscriptions.push(searchFormValueSubscription);
  }

  ngOnDestroy() {
    // Unsubscribe from all active streams
    if (this._subscriptions && this._subscriptions.length > 0) {
      this._subscriptions.forEach((subscription) => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });
    }
  }

  /**
   * @description
   * Method responsible for handling the click event on clear button
   * @param { void }
   * @returns { void }
   */
  clearSearchClicked(): void {
    const emptyData: ISearch = {
      providedSearch: '',
      search: '',
    };

    this._populateForm(emptyData);
  }

  /**
   * @description
   * Method responsible for handling the click event on search button
   * @param { string } search
   * @returns { void }
   */
  searchClicked(search: string): void {
    if (search?.length > 0) {
      const outputData: ISearch = this._prepareFormOutput();
      this.searchValue.emit(outputData);
    }
  }

  private _createForm() {
    return this._formBuilder.group({
      search: new FormControl(''),
    });
  }

  private _prepareFormOutput(): ISearch {
    return {
      providedSearch: this.providedSearchValue?.providedSearch
        ? this.providedSearchValue.providedSearch
        : '',
      search: this.form.get('search')?.value,
    };
  }

  /**
   * @description
   * Method responsible for populating form object with provided values
   * @param { ISearch } data
   */
  private _populateForm(data: ISearch | null) {
    if (!data) {
      return;
    }

    const currentSearch: string = this.form.get('search')?.value
      ? this.form.get('search')?.value
      : '';

    if (currentSearch !== data?.search) {
      this.form.setValue({
        search: data.search,
      });

      // Prepare form outpur
      this._prepareFormOutput();
      return;
    }
  }
}
