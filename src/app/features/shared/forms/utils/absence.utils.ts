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

export const TransformAbsenceRecordToApiInterface = (): IAbsenceApiPayload => {
  return {
    AbsenceDefinitionId: '',
    Comment: '',
    IsPartial: false,
    Origin: 0,
    OverrideHolidayAbsence: false,
    PartialTimeDuration: 0,
    PartialTimeFrom: null,
    PartialTimeTo: null,
    Timestamp: null,
    UserId: '',
  };
};
