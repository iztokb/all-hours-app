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

export interface IAbsenceUser {
  FirstName: string;
  Id: string;
  LastName: string;
  MiddleName: string;
}

export interface IAbsence {
  Id: string;
  UserId: string;
  FirstName: string;
  MiddleName: string;
  LastName: string;
  Timestamp: Date;
  AbsenceDefinitionId: string;
  AbsenceDefinitionName: string;
  InsertedOn: Date;
  Origin: number;
  OriginDisplayName: string;
  Comment: string;
  IsAuthentic: boolean;
  IconId: string;
  IsCalculated: boolean;
  Status: number;
  ApprovalRequest: boolean;
  PartialTimeFrom: Date | null;
  PartialTimeTo: Date | null;
  PartialTimeDuration: number;
  IsPartial: boolean;
  OverrideHolidayAbsence: boolean;
  IsModified: boolean;
  ModifiedByUser: boolean;
  ModifiedOn: Date | null;
}

export interface IAbsenceApiPayload {
  UserId: string;
  Id?: string;
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
