import { createAction, props } from '@ngrx/store';
import {
  ILocalization,
  IRoutableModule,
  ISideMenuEntity,
  SetSideMenuEntitiesMode,
  SidenavStatus,
} from '../../models';

export const CloseSideNavAction = createAction(
  '[Global-navigation] Close sidenav'
);

export const LoadSideMenuItemsAction = createAction(
  '[Global-navigation] Load side menu items',
  props<{ localization: ILocalization; moduleSignature: string }>()
);

export const LoadSideMenuItemsFailedAction = createAction(
  '[Global-navigation] Load side menu items failed',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props<{ error: any }>()
);

export const LoadSideMenuItemsSuccessAction = createAction(
  '[Global-navigation] Load side menu items success',
  props<{ items: IRoutableModule[] }>()
);

export const OpenSideNavAction = createAction(
  '[Global-navigation] Open sidenav'
);

export const RemoveModuleSideMenuEntitiesAction = createAction(
  '[Global-navigation] Remove side menu entities'
);

export const SearchSideMenuEntitiesAction = createAction(
  '[Global-navigation] Search side menu entities',
  props<{ search: string }>()
);

export const SetModuleSideMenuEntitiesAction = createAction(
  '[Global-navigation] Set side menu entities',
  props<{ entities: ISideMenuEntity[]; mode: SetSideMenuEntitiesMode }>()
);

export const ToggleSideNavAction = createAction(
  '[Global-navigation] Toggle sidenav',
  props<{ newStatus: SidenavStatus }>()
);

export const ToggleSideNavLockAction = createAction(
  '[Global-navigation] Toggle sidenav lock'
);
