import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { BaseService } from './base.service';
import { HeadersOptions, IApplicationState, IHttpHeader } from '../models';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService extends BaseService {
  private _baseUrl!: string;
  private _applicationVersion!: string;
  private _suiteVersion!: string;

  constructor(
    private _httpClient: HttpClient,
    private _store: Store<IApplicationState>
  ) {
    super();
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
    console.log('request url', requestUrl);
    return this._httpClient
      .get(requestUrl, {
        headers: headers,
        observe: 'response',
      })
      .pipe(
        tap((s) => {
          console.log(s);
          return s;
        }),
        map((response) => response.body)
      );
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
    const commonHeaders = this._baseHeaders();

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
        return this._baseHeaders();
      }

      // Http headers object
      const httpHeaders = new HttpHeaders();

      // If no requestSpecificHeaders was received, then warn and use default headers
      if (requestSpecificHeaders && requestSpecificHeaders.length === 0) {
        console.info(
          `No HTTP headers were provided although OVERIDE option was selected. Common header were used as a result.`
        );
        return this._baseHeaders();
      }

      requestSpecificHeaders.forEach((header) => {
        httpHeaders.set(header.key, header.value);
      });

      return httpHeaders;
    }
  }

  /**
   * @private @method _baseHeaders
   * @author iztokb
   * @since 2020-11-11
   * @description
   * Method responsible for returning default (common) http headers
   * @returns {HttpHeaders}
   */
  private _baseHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'X-Application-Version': this._applicationVersion,
      'X-App-Version': this._suiteVersion,
    });
  }
}
