import { Subject, Subscription } from 'rxjs';
import { IApplicationInitOptions } from './application-state.model';

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
