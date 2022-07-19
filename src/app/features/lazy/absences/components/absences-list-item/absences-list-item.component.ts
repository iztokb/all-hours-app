import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IAbsence } from 'src/app/features/shared/api-models';

@Component({
  selector: 'app-absences-list-item',
  templateUrl: './absences-list-item.component.html',
  styleUrls: ['./absences-list-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AbsencesListItemComponent implements OnInit {
  /**
   * OUTPUTS
   */
  /**
   * Emitted when absence clicks new absence for Absence button
   */
  // @Output() addAbsenceForAbsence: EventEmitter<IAbsence> = new EventEmitter<IAbsence>();

  /**
   * Eitted when absence clicks delete button
   */
  @Output() deleteAbsence: EventEmitter<IAbsence> =
    new EventEmitter<IAbsence>();

  /**
   * Emitted when absence clicks detail button
   */
  @Output() openAbsenceDetail: EventEmitter<IAbsence> =
    new EventEmitter<IAbsence>();

  /**
   * INPUTS
   */
  /**
   * @description
   * Organization Absence record
   */
  @Input() absence!: IAbsence;
  constructor() {}

  ngOnInit(): void {}

  deleteAbsenceClicked(absence: IAbsence): void {
    this.deleteAbsence.emit(absence);
  }

  openAbsenceDetailClicked(absence: IAbsence): void {
    this.openAbsenceDetail.emit(absence);
  }
}
