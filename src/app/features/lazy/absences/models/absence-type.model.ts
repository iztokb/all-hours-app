import { EntityState } from '@ngrx/entity';
import { IAbsenceDefinition } from 'src/app/features/shared/api-models';

export interface IAbsenceDefinitionState
  extends EntityState<IAbsenceDefinition> {
  loaded: boolean;
  loading: boolean;
}
