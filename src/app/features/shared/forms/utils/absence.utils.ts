import { IAbsence } from 'src/app/features/shared/api-models';

export const PrepareEmptyAbsenceRecord = (): IAbsence => {
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
