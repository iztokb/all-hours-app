import { createAction, props } from '@ngrx/store';
import { IBrowser, IDevice, IScreenProperties } from '../../models';

export const OnlineStatusChangedAction = createAction(
  '[Application environment] Online status changed',
  props<{ isOnline: boolean }>()
);

export const ResolveBrowserAction = createAction(
  '[Application environment] Resolve browser'
);

export const ResolveBrowserFailedAction = createAction(
  '[Application environment] Resolve browser failed',
  props<{ error: any }>()
);

export const ResolveBrowserSuccessAction = createAction(
  '[Application environment] Resolve browser success',
  props<{ browser: IBrowser }>()
);

export const ResolveDeviceAction = createAction(
  '[Application environment] Resolve device environment'
);

export const ResolveDeviceFailedAction = createAction(
  '[Application environment] Resolve device environment failed',
  props<{ error: any }>()
);

export const ResolveDeviceSuccessAction = createAction(
  '[Application environment] Resolve device environment success',
  props<{ device: IDevice }>()
);

export const ScreenPropertiesChangedAction = createAction(
  '[Application environment] Screen properties changed',
  props<{ screen: IScreenProperties }>()
);

export const SubscribeToOfflineChangesAction = createAction(
  '[Application environment] Subscribe to offline connection change'
);

export const SubscribeToOnlineChangesAction = createAction(
  '[Application environment] Subscribe to online connection change'
);

export const SubscribeToScreenPropertyChangesAction = createAction(
  '[Application environment] Subscribe to screen property changes'
);
