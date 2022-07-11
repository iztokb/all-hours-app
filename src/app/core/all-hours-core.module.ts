import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import {
  ApplicationInitService,
  EnvironmentService,
  HttpService,
  I18nService,
  IdentityService,
  SettingsService,
  StorageService,
  StringComparisonService,
} from './services';

import { HttpInterceptor } from './interceptors';

import { CoreEffects, CoreReducers, MetaReducers } from './store';
import { CustomRouterSerializer } from './utils';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  id: 'all-hours-core-module',
  imports: [
    CommonModule,
    EffectsModule.forRoot(CoreEffects),
    StoreModule.forRoot(CoreReducers, {
      metaReducers: MetaReducers,
      runtimeChecks: {
        strictActionImmutability: true,
        strictActionSerializability: false,
        strictStateImmutability: true,
        strictStateSerializability: true,
      },
    }),
    // In a production build you would want to disable the Store Devtools
    StoreDevtoolsModule.instrument({
      logOnly: !environment.production,
    }),
    //StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomRouterSerializer,
    }),
  ],
})
export class AllHoursCoreModule {
  static forRoot(): ModuleWithProviders<AllHoursCoreModule> {
    return {
      ngModule: AllHoursCoreModule,
      providers: [
        ApplicationInitService,
        EnvironmentService,
        HttpInterceptor,
        HttpService,
        I18nService,
        IdentityService,
        SettingsService,
        StorageService,
        StringComparisonService,
      ],
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: AllHoursCoreModule) {
    // Prevent import of core module in any module other then AppModule
    if (parentModule) {
      console.error('AllHoursCoreModule is already loaded.');
    }
  }
}
