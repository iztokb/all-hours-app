import { IUser, IUserApiPayload } from '../models';

export const PrepareEmptyUserRecord = (): IUser => {
  return {
    Address: '',
    BirthDate: null,
    CalculationStartDate: null,
    CalculationStopDate: null,
    City: '',
    CustomField1: null,
    CustomField10: null,
    CustomField2: null,
    CustomField3: null,
    CustomField4: null,
    CustomField5: null,
    CustomField6: null,
    CustomField7: null,
    CustomField8: null,
    CustomField9: null,
    CustomId: null,
    Email: '',
    FirstName: '',
    FullName: '',
    Gender: '',
    HasUserAccount: false,
    Id: '',
    IsArchived: false,
    IsTimeAttendanceUser: false,
    LastName: '',
    MiddleName: '',
    Mobile: '',
    Phone: '',
    PictureUri: '',
    State: '',
    UserAccountId: null,
  };
};

export const TransformNewUserToApiInteface = (user: IUser) => {
  // Transform new user record to interface that is compliant with API
  const transformedRecord: IUserApiPayload = {
    ...user,
  };

  delete transformedRecord['Id'];

  return transformedRecord;
};
