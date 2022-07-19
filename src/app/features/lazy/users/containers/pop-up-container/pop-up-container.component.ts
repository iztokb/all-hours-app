import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IApplicationState, ICatalogue } from 'src/app/core';
import {
  IAbsence,
  IAbsenceUser,
  IUser,
} from 'src/app/features/shared/api-models';
import { IPopupData, SupportedPopupContent } from '../../models';
import { getAbsencesListForSelect$, getUsersListForSelect$ } from '../../store';

@Component({
  selector: 'app-pop-up-container',
  templateUrl: './pop-up-container.component.html',
  styleUrls: ['./pop-up-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopUpContainerComponent implements OnInit {
  /**
   * Absences definition list
   */
  absencesDefinitionList$!: Observable<ICatalogue[]>;

  /**
   * Users list
   */
  usersList$!: Observable<IAbsenceUser[]>;

  /**
   * @description
   * Popup input data
   */
  private _popUpData!: IPopupData;
  set popUpData(value: IPopupData) {
    this._popUpData = value;
  }
  get popUpData() {
    return this._popUpData;
  }

  constructor(
    private _store: Store<IApplicationState>,
    private _dialog: MatDialog,
    private _dialogRef: MatDialogRef<PopUpContainerComponent>,
    @Inject(MAT_DIALOG_DATA)
    { contentSignature, payload }: IPopupData
  ) {
    this._popUpData = {
      ...this._popUpData,
      contentSignature,
      payload,
    };
  }

  ngOnInit(): void {
    this.absencesDefinitionList$ = this._store.pipe(
      select(getAbsencesListForSelect$)
    );

    this.usersList$ = this._store.pipe(select(getUsersListForSelect$));
  }

  closeDialog(): void {
    this._dialogRef.close(null);
  }

  submitForm(record: SupportedPopupContent): void {
    this._dialogRef.close(record);
  }
}
