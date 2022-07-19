import { EntityState } from '@ngrx/entity';
import { IAbsence } from 'src/app/features/shared/api-models';
import { IAbsenceDefinitionState } from './absence-type.model';
import { IUsersState } from './users.model';

export interface IAbsencesState extends EntityState<IAbsence> {
  activeSearch: string;
  deleted: boolean;
  deleting: boolean;
  loaded: boolean;
  loading: boolean;
  posted: boolean;
  posting: boolean;
  updated: boolean;
  updating: boolean;
}

export interface IAbsencesModuleState {
  absence_definitions: IAbsenceDefinitionState;
  absences: IAbsencesState;
  users: IUsersState;
}
