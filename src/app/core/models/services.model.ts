import { Subject, Subscription } from 'rxjs';
import { IApplicationInitOptions } from './application-state.model';
import { SupportedLocalizations } from './i18n.model';

/**
 * @interface IInitApplication
 * @description
 * Init application interface
 */
export interface IInitApplication extends IService {
  initApplication(options: IApplicationInitOptions): void;
}

/**
 * @interface IInitModule
 * @description
 * Init module interface
 * @extends IService
 */
export interface IInitModule<T> extends IService {
  initModule(options: T): void;
  teardownModule(): void;
}

/**
 * @interface IService
 * @description
 * Base services interface. Shouldn't be used without context wrap (e.g. IInitModule or IInitLib)
 */
export interface IService {
  subscriptions: Subscription[];
  subscriptionsActiveUntil: Subject<void>;
}

/**
 * @interface ILoadLocalizationDispatched
 * @description
 * Interface representing property that marks if action that loads module / lib localization has already been dispatched
 */
export interface ILoadLocalizationDispatched {
  localization: SupportedLocalizations;
  dispatched: boolean;
}
