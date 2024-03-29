import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { BaseService } from './base.service';
import {
  HeadersOptions,
  IApplicationState,
  IConfigurationProperties,
  IHttpHeader,
} from '../models';
import { filter, map, Observable } from 'rxjs';
import {
  getApplicationConfiguration$,
  getAuthenticatedIdentity$,
} from '../store';

@Injectable({
  providedIn: 'root',
})
export class HttpService extends BaseService {
  private _baseUrl!: string;
  private _applicationVersion!: string;
  private _bearerToken!: string | null;

  constructor(
    private _httpClient: HttpClient,
    private _store: Store<IApplicationState>
  ) {
    super();

    const envSubscription = this._store
      .pipe(
        select(getApplicationConfiguration$),
        filter((stream) => stream !== null)
      )
      .subscribe((envPropsStream: IConfigurationProperties | null) => {
        if (!envPropsStream) {
          return;
        }
        const isProduction = envPropsStream.production;

        // Set base url
        this._baseUrl = `https://api4.allhours.com/api/`;

        // Set application version
        this._applicationVersion = envPropsStream.applicationVersion;
      });

    this.subscriptions.push(envSubscription);

    const identitySubscription = this._store
      .pipe(select(getAuthenticatedIdentity$))
      .subscribe((identity) => {
        const token = identity?.token ? identity.token : null;

        this._bearerToken = token;
      });
  }

  delete<T>(
    url: string,
    overideBaseUrl: boolean,
    requestHeaders: IHttpHeader[] | null,
    headerOptions: HeadersOptions | null,
    includeAuth: boolean
  ): Observable<T | null | Object> {
    // Prepare headers
    const headers = this._prepareHeaders(
      requestHeaders,
      headerOptions,
      includeAuth
    );

    // Prepeare request url
    const requestUrl: string = overideBaseUrl ? url : `${this._baseUrl}/${url}`;

    return this._httpClient
      .delete(requestUrl, {
        headers: headers,
        observe: 'response',
      })
      .pipe(map((response) => (response ? response.body : null)));
  }

  get<T>(
    url: string,
    overideBaseUrl: boolean,
    requestHeaders: IHttpHeader[] | null,
    headerOptions: HeadersOptions | null,
    includeAuth: boolean
  ): Observable<T | null | Object> {
    // Prepare headers
    const headers = this._prepareHeaders(
      requestHeaders,
      headerOptions,
      includeAuth
    );

    // Prepeare request url
    const requestUrl: string = overideBaseUrl ? url : `${this._baseUrl}/${url}`;
    return this._httpClient
      .get(requestUrl, {
        headers: headers,
        observe: 'response',
      })
      .pipe(map((response) => response.body));
  }

  post<T>(
    url: string,
    overideBaseUrl: boolean,
    postData: T,
    requestHeaders: IHttpHeader[] | null,
    headerOptions: HeadersOptions | null,
    includeAuth: boolean
  ): Observable<T | null | Object> {
    // Prepare headers
    const headers = this._prepareHeaders(
      requestHeaders,
      headerOptions,
      includeAuth
    );

    // Prepeare request url
    const requestUrl: string = overideBaseUrl ? url : `${this._baseUrl}/${url}`;

    return this._httpClient
      .post(requestUrl, postData, {
        headers: headers,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  put<T>(
    url: string,
    overideBaseUrl: boolean,
    postData: T,
    requestHeaders: IHttpHeader[] | null,
    headerOptions: HeadersOptions | null,
    includeAuth: boolean
  ): Observable<T | null | Object> {
    // Prepare headers
    const headers = this._prepareHeaders(
      requestHeaders,
      headerOptions,
      includeAuth
    );

    // Prepeare request url
    const requestUrl: string = overideBaseUrl ? url : `${this._baseUrl}/${url}`;

    return this._httpClient
      .put(requestUrl, postData, {
        headers: headers,
        observe: 'response',
      })
      .pipe(
        map((response) => {
          return response.body;
        })
      );
  }

  private _prepareHeaders(
    requestSpecificHeaders: IHttpHeader[] | null,
    headerOptions: HeadersOptions | null,
    includeAuth: boolean
  ): HttpHeaders {
    // Append headers to common headers
    const commonHeaders = this._baseHeaders(includeAuth);

    headerOptions = !headerOptions ? 'APPEND' : headerOptions;

    if (headerOptions === 'APPEND') {
      // If no headers were specified then return common
      if (!requestSpecificHeaders) {
        return commonHeaders;
      }

      // If no headers were specified then return common
      if (requestSpecificHeaders && requestSpecificHeaders.length === 0) {
        return commonHeaders;
      }

      requestSpecificHeaders.forEach((header) => {
        commonHeaders.append(header.key, header.value);
      });

      return commonHeaders;
    } else {
      // Overide common headers

      // If proveded requestSpecificHeaders is null, then warn and use default headers
      if (!requestSpecificHeaders) {
        console.info(
          `No HTTP headers were provided although OVERIDE option was selected. Common header were used as a result.`
        );
        return this._baseHeaders(includeAuth);
      }

      // Http headers object
      const httpHeaders = new HttpHeaders();

      // If no requestSpecificHeaders was received, then warn and use default headers
      if (requestSpecificHeaders && requestSpecificHeaders.length === 0) {
        console.info(
          `No HTTP headers were provided although OVERIDE option was selected. Common header were used as a result.`
        );
        return this._baseHeaders(includeAuth);
      }

      requestSpecificHeaders.forEach((header) => {
        httpHeaders.set(header.key, header.value);
      });

      return httpHeaders;
    }
  }

  /**
   * @description
   * Method responsible for returning default (common) http headers
   * @returns {HttpHeaders}
   */
  private _baseHeaders(includeAuth: boolean): HttpHeaders {
    const commonHeaders: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'X-Application-Version': this._applicationVersion,
    });

    if (includeAuth && this._bearerToken) {
      const headersWithAuthorization = commonHeaders.append(
        'Authorization',
        `Bearer ${this._bearerToken}`
      );

      return headersWithAuthorization;
    }

    return commonHeaders;
  }
}
