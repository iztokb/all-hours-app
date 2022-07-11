import { createAction, props } from '@ngrx/store';
import {
  IApplicationInitOptions,
  IReferredFrom,
  ITheme,
  StorageType,
} from '../../models';

export const ResolveThemeAction = createAction(
  '[Application settings] Resolve theme',
  props<{
    storageKey: string;
    defaultTheme: ITheme;
    supportedThemes: ITheme[];
  }>()
);

export const SetConfigurationAction = createAction(
  '[Application settings] Resolve application configuration',
  props<{ applicationInitOptions: IApplicationInitOptions }>()
);

export const SetInititallyRequestedRouteAction = createAction(
  '[Application settings] Set initially requested route',
  props<{ redirectedFrom: IReferredFrom }>()
);

export const StoreThemeAction = createAction(
  '[Application settings] Store selected theme',
  props<{ storage: StorageType; theme: ITheme }>()
);

export const SwitchThemeAction = createAction(
  '[Application settings] Switch theme',
  props<{ currentTheme: ITheme }>()
);
