export interface IAbsenceDefinition {
  Id: string;
  Name: string;
  IntegrationId: number;
  Code: number;
  Type: number;
  IsAvailableForAdminsOnly: number;
  CategoryDefinitionId: string;
  CategoryDefinitionName: string;
  Fraction: number;
}

export interface IAbsence {
  UserId: string;
  Timestamp: Date | null;
  AbsenceDefinitionId: string;
  Origin: number;
  Comment: string;
  PartialTimeFrom: Date | null;
  PartialTimeTo: Date | null;
  PartialTimeDuration: number;
  IsPartial: boolean;
  OverrideHolidayAbsence: boolean;
}
