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
import { IUser } from 'src/app/features/shared/api-models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  /**
   * OUTPUTS
   */

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  saveRecord: EventEmitter<IUser> = new EventEmitter<IUser>();

  /**
   * INPUTS
   */
  private _record!: IUser | undefined;
  @Input()
  set record(value: IUser | undefined) {
    this._record = value;

    if (value) {
      this.populateFormWithData(value);
    }
  }
  get record() {
    return this._record;
  }

  @Input() submitInProgress!: boolean;

  /**
   * OTHER PROPS
   */
  form!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (!this.form) {
      this.form = this.createForm();
    }
  }

  cancelClicked() {
    this.cancel.emit();
  }

  saveFormClicked(originalRecord: IUser): void {
    const record = this.prepareFormOutputData(originalRecord);

    this.saveRecord.emit(record);
  }

  protected createForm(): FormGroup {
    return this._formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  protected populateFormWithData(record: IUser): void {
    if (!record) {
      return;
    }

    if (!this.form) {
      this.form = this.createForm();
    }

    this.form.setValue({
      firstName: record?.FirstName ? record.FirstName : '',
      lastName: record?.LastName ? record.LastName : '',
      email: record?.Email ? record.Email : '',
    });
  }

  protected prepareFormOutputData(originalRecord: IUser): IUser {
    return {
      ...originalRecord,
      FirstName: this.form.get('firstName')?.value,
      LastName: this.form.get('lastName')?.value,
      Email: this.form.get('email')?.value,
    };
  }
}
