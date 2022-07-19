import { Pipe, PipeTransform } from '@angular/core';
import { IAbsence } from 'src/app/features/shared/api-models';
import { PrepareEmptyAbsenceRecord } from 'src/app/features/shared/forms';
import { IPopupData } from '../models';

@Pipe({
  name: 'validateAbsenceFormRecordInput',
})
export class ValidateAbsenceFormRecordInputPipe implements PipeTransform {
  transform(value: IPopupData, ...args: unknown[]): IAbsence {
    if (!value) {
      return PrepareEmptyAbsenceRecord();
    }

    return value.payload as unknown as IAbsence;
  }
}
