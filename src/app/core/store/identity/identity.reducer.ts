import { Action, createReducer, on } from '@ngrx/store';
import { IIdentityState } from '../../models';
import * as identityActions from './identity.actions';

export const IDENTITY_INITIAL_STATE: IIdentityState = {
  authenticated: null,
  loggingOutAuthenticatedIdentity: null,
  public: null,
  resolvingAuthenticatedIdentity: null,
};

export const IdentityReducer = createReducer(
  IDENTITY_INITIAL_STATE,
  on(identityActions.LogoutAuthenticatedIdentityAction, (state, payload) => {
    return {
      ...state,
      loggingOutAuthenticatedIdentity: true,
    };
  }),
  on(
    identityActions.LogoutAuthenticatedIdentityFailedAction,
    (state, payload) => {
      return {
        ...state,
        loggingOutAuthenticatedIdentity: false,
      };
    }
  ),
  on(
    identityActions.LogoutAuthenticatedIdentitySuccessAction,
    (state, payload) => {
      return {
        ...state,
        additionalAuthenticatedIdentityDataLoaded: false,
        additionalAuthenticatedIdentityDataLoading: false,
        authenticated: null,
        loggingOutAuthenticatedIdentity: false,
      };
    }
  ),
  on(identityActions.ResolveAuthenticatedIdentityAction, (state, payload) => {
    return {
      ...state,
      resolvingAuthenticatedIdentity: true,
    };
  }),
  on(
    identityActions.ResolveAuthenticatedIdentityFailedAction,
    (state, payload) => {
      return {
        ...state,
        resolvingAuthenticatedIdentity: false,
      };
    }
  ),
  on(
    identityActions.ResolveAuthenticatedIdentitySuccessAction,
    (state, payload) => {
      return {
        ...state,
        authenticated: payload.identity,
        resolvingAuthenticatedIdentity: false,
      };
    }
  ),
  on(identityActions.SetPublicIdentityAction, (state, payload) => {
    return {
      ...state,
      public: {
        visitTime: new Date().getTime(),
        visitorId: payload.visitorId,
      },
    };
  })
);
