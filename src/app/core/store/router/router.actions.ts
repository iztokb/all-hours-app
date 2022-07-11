import { NavigationExtras, Params } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export const RouterGoAction = createAction(
  '[Router] Router go',
  props<{
    path: any[];
    query?: Params | null;
    extras?: NavigationExtras | null;
  }>()
);

export const RouterBackAction = createAction('[Router] Back');

export const RouterForwardAction = createAction('[Router] Forward');
