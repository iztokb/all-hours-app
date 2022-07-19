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
import { ICatalogue } from 'src/app/core';
import { IAbsence, IAbsenceUser } from '../../../api-models';

@Component({
  selector: 'app-absence-form',
  templateUrl: './absence-form.component.html',
  styleUrls: ['./absence-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbsenceFormComponent implements OnInit {
  /**
   * OUTPUTS
   */

  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  saveRecord: EventEmitter<IAbsence> = new EventEmitter<IAbsence>();

  /**
   * INPUTS
   */
  @Input() absenceTypeList: ICatalogue[] | null = [];

  private _record!: IAbsence | undefined;
  @Input()
  set record(value: IAbsence | undefined) {
    this._record = value;

    if (value) {
      this.populateFormWithData(value);
    }
  }
  get record() {
    return this._record;
  }

  @Input() submitInProgress!: boolean;

  @Input() users: IAbsenceUser[] | null = [];

  /**
   * OTHER PROPS
   */
  form!: FormGroup;
  protected pickerStartDate = new Date();

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    if (!this.form) {
      this.form = this.createForm();
    }
  }

  cancelClicked() {
    this.cancel.emit();
  }

  compareLists(valueFromList: ICatalogue, selectedValue: ICatalogue) {
    if (!valueFromList || !selectedValue) {
      return false;
    }

    return valueFromList.signature === selectedValue.signature;
  }

  compareUsersLists(valueFromList: IAbsenceUser, selectedValue: IAbsenceUser) {
    if (!valueFromList || !selectedValue) {
      return false;
    }

    return valueFromList.Id === selectedValue.Id;
  }

  saveFormClicked(originalRecord: IAbsence): void {
    const record = this.prepareFormOutputData(originalRecord);

    this.saveRecord.emit(record);
  }

  protected createForm(): FormGroup {
    return this._formBuilder.group({
      absenceType: new FormControl('', [Validators.required]),
      comment: new FormControl('', [Validators.required]),
      from: new FormControl(null, [Validators.required]),
      to: new FormControl(null, [Validators.required]),
      user: new FormControl(null, [Validators.required]),
    });
  }

  protected populateFormWithData(record: IAbsence): void {
    if (!record) {
      return;
    }

    if (!this.form) {
      this.form = this.createForm();
    }

    // First create object for select fields
    const absenceType: ICatalogue = {
      disabled: false,
      signature: record?.AbsenceDefinitionId,
      value: record?.AbsenceDefinitionName,
      visible: true,
    };

    const user: IAbsenceUser = {
      FirstName: record?.FirstName ? record?.FirstName : '',
      Id: record.UserId,
      LastName: record?.LastName ? record.LastName : '',
      MiddleName: record?.MiddleName ? record.MiddleName : '',
    };

    this.form.setValue({
      absenceType: absenceType,
      comment: record?.Comment ? record.Comment : '',
      from: record?.PartialTimeFrom ? record.PartialTimeFrom : null,
      to: record?.PartialTimeTo ? new Date(record.PartialTimeTo) : null,
      user: user,
    });
  }

  protected prepareFormOutputData(originalRecord: IAbsence): IAbsence {
    return {
      ...originalRecord,
      AbsenceDefinitionId: this.form.get('absenceType')?.value?.signature,
      AbsenceDefinitionName: this.form.get('absenceType')?.value?.value,
      Comment: this.form.get('comment')?.value,
      FirstName: this.form.get('user')?.value?.FirstName,
      LastName: this.form.get('user')?.value?.LastName,
      MiddleName: this.form.get('user')?.value?.MiddleName,
      PartialTimeFrom: this.form.get('from')?.value,
      PartialTimeTo: this.form.get('to')?.value,
      UserId: this.form.get('user')?.value?.Id,
    };
  }
}
