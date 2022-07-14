import { Params } from '@angular/router';
import { EntityState } from '@ngrx/entity';

export type SidenavStatus = 'OPENED' | 'CLOSED';

/**
 * @interface ISidenavState
 * @description
 * Interface representing current sidenav state
 */
export interface ISidenavState {
  locked: boolean;
  status: SidenavStatus;
}

/**
 * @type SetSideMenuEntitiesMode
 * @description
 * Currently supported mode signatures for setting side menu entites
 */
export type SetSideMenuEntitiesMode = 'APPEND' | 'REPLACE';

/**
 * @type RoutableItemType
 * @description
 * Routable component mode signature
 */
export type RoutableItemType = 'SIDE_MENU' | 'SIDE_NAV';

/**
 * @interface IRoutableModule
 * @description
 * Interface representing common routable module item as used in apps
 * when navigating to certain module
 */
export interface IRoutableModule {
  description: string;
  icon: string;
  id: number;
  name: string;
  params: Params | null;
  path: string[];
  sortingPosition: number;
  url: string;
}

/**
 * @interface ISideMenuEntity
 * @description
 * Interface representing side menu entity record
 */
export interface ISideMenuEntity extends IRoutableModule {
  module: string;
}

/**
 * @interface IGlobalNavigationState
 * @description
 * Interface representing side menu store slice
 */
export interface IGlobalNavigationState extends EntityState<ISideMenuEntity> {
  loaded: boolean;
  loading: boolean;
  locked: boolean;
  search: string;
  status: SidenavStatus;
}
