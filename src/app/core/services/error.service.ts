import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { ErrorSource, IAppError } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ErrorService implements ErrorHandler {
  constructor(private _injector: Injector) {}

  handleError(error: Error | HttpErrorResponse): void {
    const errorSource: ErrorSource =
      error instanceof HttpErrorResponse ? 'HTTP' : 'CLIENT';

    const handledError: IAppError | null = this._transformError(
      errorSource,
      error
    );

    if (handledError) {
      // Pass the error to the logger. For now just log to console
      console.error(handledError);
    }
  }

  private _transformError(
    errorType: ErrorSource,
    error: Error | HttpErrorResponse
  ): IAppError | null {
    switch (errorType) {
      case 'CLIENT': {
        const clientError: Error = error as unknown as Error;

        return {
          error: clientError,
          message: clientError?.message,
          source: 'CLIENT',
          stack: clientError?.stack,
        };
      }

      case 'HTTP': {
        const httpError: HttpErrorResponse =
          error as unknown as HttpErrorResponse;

        return {
          error: httpError,
          message: httpError?.message,
          source: 'HTTP',
          stack: null,
        };
      }

      default: {
        return null;
      }
    }
  }
}
