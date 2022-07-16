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
import { IUser } from '../../models';

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
  @Input() record!: IUser | undefined;

  @Input() submitInProgress!: boolean;

  /**
   * OTHER PROPS
   */
  form!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.createForm();
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
