import { createReducer, on } from '@ngrx/store';
import { IApplicationEnvironmentState } from '../../models';
import {
  DeviceIsOnLine,
  ResolveBrowserEnvironment,
  ResolveDeviceProperties,
} from '../../utils';
import * as environmentActions from './environment.actions';

export const APPLICATION_ENVIRONMENT_INITIAL_STATE: IApplicationEnvironmentState =
  {
    browser: null,
    device: null,
  };

export const EnvironmentReducer = createReducer(
  APPLICATION_ENVIRONMENT_INITIAL_STATE,
  on(environmentActions.OnlineStatusChangedAction, (state, payload) => {
    if (!state?.device) {
      return state;
    }

    return {
      ...state,
      device: {
        ...state.device,
        onLine: payload.isOnline,
      },
    };
  }),
  on(environmentActions.ResolveBrowserAction, (state, payload) => {
    const browserProps = ResolveBrowserEnvironment();

    if (browserProps) {
      return {
        ...state,
        browser: browserProps,
      };
    }

    return state;
  }),
  on(environmentActions.ResolveBrowserSuccessAction, (state, payload) => {
    if (!payload.browser) {
      return state;
    }

    return {
      ...state,
      browser: payload.browser,
    };
  }),
  on(environmentActions.ResolveDeviceAction, (state, payload) => {
    const deviceProps = ResolveDeviceProperties();

    const isOnline = DeviceIsOnLine();

    if (!deviceProps || !isOnline) {
      return state;
    }

    return {
      ...state,
      device: {
        ...deviceProps,
        onLine: isOnline,
      },
    };
  }),
  on(environmentActions.ScreenPropertiesChangedAction, (state, payload) => {
    // If device slice is null then it doesn't make sense to continue.
    // It shouldn't happen but just to be on a safe side
    if (!state.device) {
      return state;
    }

    return {
      ...state,
      device: {
        ...state.device,
        screen: payload.screen,
      },
    };
  })
);
