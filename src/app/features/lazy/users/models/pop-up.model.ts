import { IUser } from './users.model';

/**
 * @type SupportedPopupContentSignatures
 * @description
 * Available content signatures that can be used in pop-up component
 */
export type SupportedPopupContentSignatures = 'USER_FORM';

/**
 * @interface IPopupData
 * @description
 * Interface representing the data that is passed to PopUpComponent
 */
export interface IPopupData {
  contentSignature: SupportedPopupContentSignatures;
  payload: IUser;
}
