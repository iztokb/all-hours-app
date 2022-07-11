import { IResult, UAParser } from 'ua-parser-js';
import {
  IBrowser,
  IDevice,
  IScreenProperties,
  ITouchCapabilities,
  IWindowSize,
  ScreenSizeCategory,
} from '../models';

/**
 * @description
 * Function responsible for asserting the navigator compliance
 * @param { void }
 * @returns { boolean }
 */
export const CheckNavigatorCompliance = (): boolean => {
  return window && window.navigator ? true : false;
};

/**
 * @description
 * Function responsible for check if device is online or not
 * @param { void }
 * @returns { BrowserType }
 */
export const DeviceIsOnLine = (): boolean | null => {
  const navigatorAvailable = CheckNavigatorCompliance();

  if (!navigatorAvailable) {
    return null;
  }

  return navigator.onLine;
};

/**
 * @description
 * Function responsible for resolving browser environment properties
 * @param { void }
 * @returns { IBrowser | null }
 */
export const ResolveBrowserEnvironment = (): IBrowser | null => {
  const navigatorAvailable = CheckNavigatorCompliance();

  if (!navigatorAvailable) {
    return null;
  }

  const browserProps: IResult = new UAParser().getResult();

  return {
    acceptedLanguages: navigator.languages as string[],
    browserLanguage: navigator.language,
    majorVersion: browserProps.browser.version,
    name: ResolveBrowserName(),
    renderingEngine: browserProps.engine.name,
    renderingEngineVersion: browserProps.engine.version,
    version: browserProps.browser.version,
    window: ResolveWindowSize(),
  };
};

/**
 * @description
 * Function responsible for resolving browser name
 * @returns { string }
 */
export const ResolveBrowserName = (): string => {
  const browserProps: IResult = new UAParser().getResult();

  return browserProps?.browser?.name ? browserProps.browser.name : '';
};

export const ResolveDeviceProperties = (): IDevice | null => {
  const navigatorAvailable = CheckNavigatorCompliance();

  if (!navigatorAvailable) {
    return null;
  }

  const browserName = ResolveBrowserName();

  const deviceProps: IResult = new UAParser().getResult();

  return {
    cpuType: deviceProps?.cpu?.architecture ? deviceProps.cpu.architecture : '',
    model: deviceProps?.device?.model ? deviceProps.device.model : '',
    os: deviceProps?.os?.name ? deviceProps.os.name : '',
    osVersion: deviceProps?.os?.version ? deviceProps.os.version : '',
    screen: null,
    touch: ResolveDeviceTouchCapabilities(),
    type: deviceProps?.device?.type ? deviceProps.device.type : '',
    vendor: deviceProps?.device?.vendor ? deviceProps.device.vendor : '',
  };
};

/**
 * @description
 * Function responsible for resolving device touck capabilities
 * @param { void }
 * @returns { ITouchCapabilities | null}
 */
export const ResolveDeviceTouchCapabilities = (): ITouchCapabilities | null => {
  const navigatorAvailable = CheckNavigatorCompliance();

  if (!navigatorAvailable) {
    return null;
  }

  const maxTouchPoints = navigator.maxTouchPoints;

  return {
    capable: maxTouchPoints > 0 ? true : false,
    maxTouchPoints,
  };
};

/**
 * @description
 * Function responsible for resolving screen properties
 * @param { string } browserName
 * @param { ScreenSizeCategory } activeBreakpoint
 * @returns { IScreenProperties | null }
 */
export const ResolveScreenProperties = (
  browserName: string,
  activeBreakpoint: ScreenSizeCategory
): IScreenProperties => {
  if (!window) {
    throw Error('It seems that window object not available on this device');
  }

  const type = window?.screen?.orientation?.type;

  const angle =
    browserName === 'Edge' || browserName === 'IE' || browserName === 'Safari'
      ? 0
      : window?.screen?.orientation?.angle;

  return {
    activeScreenSize: activeBreakpoint,
    height: window.screen.availHeight,
    orientation: {
      type,
      angle,
    },
    width: window.screen.availWidth,
  };
};

/**
 * @description
 * Function responsible for resolving application url origin
 * @param { void }
 * @returns { string | null }
 */
export const ResolveUrlOrigin = (): string | null => {
  if (!window) {
    throw Error('It seems that window object not available on this device');
    return null;
  }

  return window.location.origin;
};

/**
 * @description
 * Function responsible for resolving viewport size
 * @param { string } mediaQuery
 * @returns { ScreenSizeCategory}
 */
export const ResolveViewportSize = (mediaQuery: string): ScreenSizeCategory => {
  switch (mediaQuery) {
    case '(max-width: 599.98px)':
    case '(max-width: 599.98px) and (orientation: portrait)':
    case '(max-width: 959.98px) and (orientation: landscape)': {
      return 'HANDSET';
    }

    case '(min-width: 600px) and (max-width: 959.98px)':
    case '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)':
    case '(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)': {
      return 'TABLET';
    }

    case '(min-width: 1280px) and (max-width: 1919.98px)':
    case '(min-width: 1920px)':
    case '(min-width: 840px) and (orientation: portrait)':
    case '(min-width: 1280px) and (orientation: landscape)': {
      return 'WEB';
    }

    default: {
      return 'WEB';
    }
  }
};

/**
 * @description
 * Function responsible for asserting the current window size
 * @param { void }
 * @returns { IWindowSize | null }
 */
export const ResolveWindowSize = (): IWindowSize | null => {
  if (!window) {
    throw Error('It seems that window object not available on this device');
    return null;
  }

  return {
    height: window.innerHeight,
    width: window.innerWidth,
  };
};
