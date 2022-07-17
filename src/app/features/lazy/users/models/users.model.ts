import { EntityState } from '@ngrx/entity';
import { IAbsenceDefinitionState } from './absences.model';

/**
 * @interface IUser
 * @description
 * User entity
 */
export interface IUser {
  Id: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  FullName: string;
  BirthDate: Date | null;
  Address: string | null;
  City: string | null;
  State: string | null;
  Phone: string | null;
  Mobile: string | null;
  Email: string | null;
  Gender: string;
  PictureUri: string | null;
  CustomId: string | null;
  CustomField1: string | null;
  CustomField2: string | null;
  CustomField3: string | null;
  CustomField4: string | null;
  CustomField5: string | null;
  CustomField6: string | null;
  CustomField7: string | null;
  CustomField8: string | null;
  CustomField9: string | null;
  CustomField10: string | null;
  IsTimeAttendanceUser: boolean;
  IsArchived: boolean;
  HasUserAccount: boolean;
  UserAccountId: string | null;
  CalculationStartDate: string | null;
  CalculationStopDate: null;
}

export interface IUserApiPayload {
  Id?: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  FullName: string;
  BirthDate: Date | null;
  Address: string | null;
  City: string | null;
  State: string | null;
  Phone: string | null;
  Mobile: string | null;
  Email: string | null;
  Gender: string;
  PictureUri: string | null;
  CustomId: string | null;
  CustomField1: string | null;
  CustomField2: string | null;
  CustomField3: string | null;
  CustomField4: string | null;
  CustomField5: string | null;
  CustomField6: string | null;
  CustomField7: string | null;
  CustomField8: string | null;
  CustomField9: string | null;
  CustomField10: string | null;
  IsTimeAttendanceUser: boolean;
  IsArchived: boolean;
  HasUserAccount: boolean;
  UserAccountId: string | null;
  CalculationStartDate: string | null;
  CalculationStopDate: null;
}

export interface IUsersState extends EntityState<IUser> {
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

export interface IUsersModulestate {
  absence_definitions: IAbsenceDefinitionState;
  users: IUsersState;
}
