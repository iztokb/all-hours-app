import { EntityState } from '@ngrx/entity';
import { IUser } from 'src/app/features/shared/api-models';

export interface IUsersState extends EntityState<IUser> {
  loaded: boolean;
  loading: boolean;
}
