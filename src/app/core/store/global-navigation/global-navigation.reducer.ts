import { createEntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { IGlobalNavigationState, ISideMenuEntity } from '../../models';
import * as globalNavigationActions from './global-navigation.actions';

const globalNavigationAdapter = createEntityAdapter<ISideMenuEntity>({
  selectId: (record: ISideMenuEntity) => `${record.module}-${record.id}`,
  sortComparer: (a: ISideMenuEntity, b: ISideMenuEntity) => {
    return a.sortingPosition - b.sortingPosition;
  },
});

const GLOBAL_NAVIGATION_INITIAL_STATE: IGlobalNavigationState =
  globalNavigationAdapter.getInitialState({
    loaded: false,
    loading: false,
    locked: false,
    search: '',
    status: 'CLOSED',
  });

export const GlobalNavigationReducer = createReducer(
  GLOBAL_NAVIGATION_INITIAL_STATE,
  on(globalNavigationActions.CloseSideNavAction, (state, payload) => {
    return {
      ...state,
      status: 'CLOSED',
    };
  }),
  on(globalNavigationActions.OpenSideNavAction, (state, payload) => {
    return {
      ...state,
      status: 'OPENED',
    };
  }),
  on(
    globalNavigationActions.RemoveModuleSideMenuEntitiesAction,
    (state, payload) => {
      return globalNavigationAdapter.removeAll(state);
    }
  ),
  on(globalNavigationActions.SearchSideMenuEntitiesAction, (state, payload) => {
    return {
      ...state,
      search: payload.search,
    };
  }),
  on(
    globalNavigationActions.SetModuleSideMenuEntitiesAction,
    (state, payload) => {
      switch (payload.mode) {
        case 'APPEND': {
          return globalNavigationAdapter.upsertMany(payload.entities, state);
        }

        case 'REPLACE': {
          // First remove current records
          const stateAfterRemoval: IGlobalNavigationState =
            globalNavigationAdapter.removeAll(state);

          // Now upsert recieved items
          return globalNavigationAdapter.upsertMany(
            payload.entities,
            stateAfterRemoval
          );
        }

        default: {
          return state;
        }
      }
    }
  ),
  on(globalNavigationActions.ToggleSideNavAction, (state, payload) => {
    return {
      ...state,
      status: payload.newStatus,
    };
  }),
  on(globalNavigationActions.ToggleSideNavLockAction, (state, payload) => {
    const newLockState = state.locked ? false : true;
    return {
      ...state,
      locked: newLockState,
    };
  })
);
