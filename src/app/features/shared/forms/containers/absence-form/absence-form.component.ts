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
import { IAbsence } from '../../../api-models';

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

    const user: ICatalogue = {
      disabled: false,
      signature: record?.UserId,
      value: `${record?.FirstName} ${record?.LastName}`,
      visible: true,
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
      PartialTimeFrom: this.form.get('from')?.value,
      PartialTimeTo: this.form.get('to')?.value,
      UserId: this.form.get('user')?.value?.signature,
    };
  }
}
