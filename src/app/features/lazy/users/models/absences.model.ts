import { EntityState } from '@ngrx/entity';

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

export interface IAbsenceDefinitionState
  extends EntityState<IAbsenceDefinition> {
  loaded: boolean;
  loading: boolean;
}
