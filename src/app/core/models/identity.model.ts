import { Params } from '@angular/router';

/**
 * @type IdentityProvider
 * @description
 * Supported identity providers
 */
export type IdentityProvider = 'NONE';

/**
 * @interface IPublicIdentity
 * @description
 * Interface representing public identity of the user
 */
export interface IPublicIdentity {
  visitorId: string;
  visitTime: number;
}

/**
 * @interface IIdentityConfiguration
 * @description
 * Interface representing identity settings object in environment file
 */
export interface IIdentityConfiguration {
  identityProvider: IdentityProvider;
  redirectQueryParamsAfterSuccessfulAuthentication: Params | null;
  redirectUrlAfterSuccessfulAuthentication: string[];
  resetPasswordUrl: string[];
}

/**
 * @interface IAuthenticatedIdentity
 * @description
 * Interface representing the authenticated identity as required by the app.
 * Note that this is not a payload that is returned by identity provider.
 */
export interface IAuthenticatedIdentity {
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: string;
  token: string;
  uid: string;
}

/**
 * @interface IIdentityState
 * @description
 * Interface representing identity state slice
 */
export interface IIdentityState {
  authenticated: IAuthenticatedIdentity | null;
  loggingOutAuthenticatedIdentity: boolean | null;
  public: IPublicIdentity | null;
  resolvingAuthenticatedIdentity: boolean | null;
}
