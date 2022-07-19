import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from 'src/app/features/shared/api-models';
import { IPopupData } from '../models';
import { PrepareEmptyUserRecord } from '../utils';

@Pipe({
  name: 'validateUserFormRecordInput',
})
export class ValidateUserFormRecordInputPipe implements PipeTransform {
  transform(value: IPopupData, ...args: unknown[]): IUser {
    if (!value) {
      return PrepareEmptyUserRecord();
    }

    return value.payload as unknown as IUser;
  }
}
