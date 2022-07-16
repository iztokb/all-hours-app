import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, throwError, of, tap, switchMap } from 'rxjs';
import { IApplicationState } from '../models';
import { Store } from '@ngrx/store';
import { LogoutAuthenticatedIdentityAction } from '../store';

@Injectable()
export class ApplicationHttpInterceptor implements HttpInterceptor {
  constructor(private _store: Store<IApplicationState>) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // For now only catch error. In the future, different flows can be implemented here
      // E.g. 401 - redirect to authentication module; 404 - redirect to Not found module
      catchError((error: HttpErrorResponse) => {
        return of(error).pipe(
          tap((httpError: HttpErrorResponse) => {
            if (httpError.status === 401) {
              this._store.dispatch(LogoutAuthenticatedIdentityAction());
            }

            return httpError as HttpErrorResponse;
          }),
          switchMap((httpError: HttpErrorResponse) => {
            return throwError(() => new Error(error.message));
          })
        );
      })
    );
  }
}
