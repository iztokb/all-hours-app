/**
 * @type HeadersOptions
 * @description
 * Header options type. Either append headers to common headers or override them completely
 */
export type HeadersOptions = 'APPEND' | 'OVERIDE';

/**
 * @interface IHttpHeader
 * @description
 * Interface representing HTTP header item
 */
export interface IHttpHeader {
  key: string;
  value: string;
}
