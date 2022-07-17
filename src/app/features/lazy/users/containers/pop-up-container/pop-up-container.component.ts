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
import { Store } from '@ngrx/store';
import { IApplicationState } from 'src/app/core';
import { IAbsence } from 'src/app/features/shared/api-models';
import { IPopupData, IUser, SupportedPopupContent } from '../../models';

@Component({
  selector: 'app-pop-up-container',
  templateUrl: './pop-up-container.component.html',
  styleUrls: ['./pop-up-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopUpContainerComponent implements OnInit {
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

  ngOnInit(): void {}

  closeDialog(): void {
    this._dialogRef.close(null);
  }

  submitForm(user: SupportedPopupContent): void {
    this._dialogRef.close(user);
  }
}
