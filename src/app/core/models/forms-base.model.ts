export type CrudMethods = 'DELETE' | 'GET' | 'POST' | 'PUT';

/**
 * @interface ICatalogue
 * @description
 * Interface representing catalogue record that is consumed by select and autocomplete fields
 */
export interface ICatalogue {
  disabled: boolean;
  signature: string;
  value: string | number;
  visible: boolean;
}
