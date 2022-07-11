import { Params } from '@angular/router';

/**
 * @interface INotAuthenticatedRedirectData
 * @description
 * Interface representing payload by the authentication guard
 * when it is redirecting to the authentication module
 */
export interface INotAuthenticatedRedirectData {
  requestedQueryParams: Params | null;
  requestedUrl: string[];
}

/**
 * @interface IRouterState
 * @description
 * Interface representing router state
 */
export interface IRouterState {
  url: string;
  params: Params;
  pathFromRoot: string[];
  queryParams: Params;
}

/**
 * @interface INotFoundRedirectData
 * @description
 * Interface used when redirecting to not found route
 */
export interface INotFoundRedirectData {
  compareTo: string[];
  moduleUrl: string[];
  requestedQueryParams: Params | null;
  requestedUrl: string;
}

/**
 * @interface IRedirectToAlternativeRoute
 * @description
 * Route entity record that is used to suggest user if there are any alternative routes
 * available which are similar to the one she / he requested
 */
export interface IRedirectToAlternativeRoute {
  alternativeRouteUrl: string;
  moduleUrl: string[];
  queryParams: Params | null;
}

/**
 * @interface IReferredFrom
 * @description
 * Interface representing initially requested URL of the app.
 */
export interface IReferredFrom {
  params: Params | null;
  queryParams: Params | null;
  url: string[];
}
