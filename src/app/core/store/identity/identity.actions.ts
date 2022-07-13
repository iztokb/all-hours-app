import { createAction, props } from '@ngrx/store';
import { IAuthenticatedIdentity, IdentityProvider } from '../../models';

export const LogoutAuthenticatedIdentityAction = createAction(
  '[Identity] Logout authenticated identity'
);

export const LogoutAuthenticatedIdentityFailedAction = createAction(
  '[Identity] Logout authenticated identity failed',
  props<{ error: any }>()
);

export const LogoutAuthenticatedIdentitySuccessAction = createAction(
  '[Identity] Logout authenticated identity success'
);

export const ResolveAuthenticatedIdentityAction = createAction(
  '[Identity] Resolve authenticated identity',
  props<{ identityProvider: IdentityProvider; redirectUrl: string[] }>()
);

export const ResolveAuthenticatedIdentityFailedAction = createAction(
  '[Identity] Resolve authenticated identity failed',
  props<{ error: unknown }>()
);

export const ResolveAuthenticatedIdentitySuccessAction = createAction(
  '[Identity] Resolve authenticated identity success',
  props<{ identity: IAuthenticatedIdentity; redirectUrl: string[] }>()
);

export const SetAuthenticatedIdentityAction = createAction(
  '[Identity] Set authenticated identity',
  props<{ identity: IAuthenticatedIdentity; redirectUrl: string[] }>()
);

export const SetPublicIdentityAction = createAction(
  '[Identity] Resolve authenticated identity success',
  props<{ visitorId: string }>()
);

export const StoreAuthTokenAction = createAction(
  '[Identity] Store token',
  props<{ token: string }>()
);
