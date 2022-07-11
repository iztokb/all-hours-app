/**
 * @type ScreenSizeCategory
 * @description
 * Type representing screen size categories
 */
export type ScreenSizeCategory = 'HANDSET' | 'TABLET' | 'WEB';

/**
 * @interface IDevice
 * @description
 * Interface representing device properties
 */
export interface IDevice {
  cpuType: string | undefined;
  model: string | undefined;
  os: string | undefined;
  osVersion: string | undefined;
  screen: IScreenProperties | null;
  type: string | undefined;
  vendor: string | undefined;
  touch: ITouchCapabilities | null;
}

/**
 * @interface IScreenProperties
 * @description
 * Interface representing screen properties
 */
export interface IScreenProperties {
  activeScreenSize: ScreenSizeCategory | null;
  height: number;
  orientation: {
    type: string;
    angle: number;
  };
  width: number;
}

/**
 * @interface IBrowser
 * @description
 * Interface representing browser properties
 */
export interface IBrowser {
  acceptedLanguages: string[];
  browserLanguage: string;
  majorVersion: string | undefined;
  name: string;
  renderingEngine: string | undefined;
  renderingEngineVersion: string | undefined;
  version: string | undefined;
  window: IWindowSize | null;
}

/**
 * @interface IWindowSize
 * @description
 * Interface representing the window dimensions
 */
export interface IWindowSize {
  height: number;
  width: number;
}

export interface ITouchCapabilities {
  capable: boolean;
  maxTouchPoints: number;
}

/**
 * @interface IApplicationEnvironmentState
 * @description
 * Interface representing application environment properties
 */
export interface IApplicationEnvironmentState {
  browser: IBrowser | null;
  device: IDevice | null;
}
