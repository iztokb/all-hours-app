import { CrudMethods } from 'src/app/core';
import {
  IAbsence,
  IAbsenceApiPayload,
} from 'src/app/features/shared/api-models';

export const PrepareEmptyAbsenceRecord = (): IAbsence => {
  return {
    AbsenceDefinitionId: '',
    AbsenceDefinitionName: '',
    ApprovalRequest: false,
    Comment: '',
    FirstName: '',
    IconId: '',
    Id: '',
    InsertedOn: new Date(),
    IsAuthentic: false,
    IsCalculated: false,
    IsModified: false,
    IsPartial: false,
    LastName: '',
    MiddleName: '',
    ModifiedByUser: false,
    ModifiedOn: null,
    OriginDisplayName: '',
    Origin: 0,
    OverrideHolidayAbsence: false,
    PartialTimeDuration: 0,
    PartialTimeFrom: null,
    PartialTimeTo: null,
    Status: 0,
    Timestamp: new Date(),
    UserId: '',
  };
};

export const TransformAbsenceRecordToApiInterface = (
  absence: IAbsence,
  crudMethod: CrudMethods
): IAbsenceApiPayload => {
  const transformedRecord: IAbsenceApiPayload = {
    AbsenceDefinitionId: absence.AbsenceDefinitionId
      ? absence.AbsenceDefinitionId
      : '',
    Comment: absence?.Comment ? absence.Comment : '',
    IsPartial: absence?.IsPartial ? absence?.IsPartial : false,
    Origin: absence?.Origin ? absence.Origin : 0,
    OverrideHolidayAbsence: absence?.OverrideHolidayAbsence
      ? absence?.OverrideHolidayAbsence
      : false,
    PartialTimeDuration: absence?.PartialTimeDuration
      ? absence?.PartialTimeDuration
      : 0,
    PartialTimeFrom: absence?.PartialTimeFrom ? absence?.PartialTimeFrom : null,
    PartialTimeTo: absence?.PartialTimeTo ? absence?.PartialTimeTo : null,
    Timestamp: absence?.Timestamp ? absence.Timestamp : null,
    UserId: absence?.UserId ? absence?.UserId : '',
  };

  if (crudMethod === 'POST') {
    delete transformedRecord['Id'];

    return transformedRecord;
  } else {
    return transformedRecord;
  }
};
