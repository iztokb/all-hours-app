import { IAbsence } from 'src/app/features/shared/api-models';

/**
 * @type SupportedPopupContentSignatures
 * @description
 * Available content signatures that can be used in pop-up component
 */
export type SupportedPopupContentSignatures = 'ABSENCE_FORM';

/**
 * @type SupportedPopupContent
 * @description
 * Available content that can be sued in pop-up component
 */
export type SupportedPopupContent = IAbsence;

/**
 * @interface IPopupData
 * @description
 * Interface representing the data that is passed to PopUpComponent
 */
export interface IPopupData {
  contentSignature: SupportedPopupContentSignatures;
  payload: SupportedPopupContent;
}
