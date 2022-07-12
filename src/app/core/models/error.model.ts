/**
 * @description
 * Error source.
 */
export type ErrorSource = 'CLIENT' | 'HTTP';

/**
 * @description
 * Standardized error shape
 */
export interface IAppError {
  error: any | null;
  source: ErrorSource;
  message: string;
  stack?: any;
}
