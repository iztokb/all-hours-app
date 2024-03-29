import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import commonLocaleEn from '@angular/common/locales/en';
import extraLocaleEn from '@angular/common/locales/extra/en';
import extraLocaleSl from '@angular/common/locales/extra/sl';
import commonLocaleSl from '@angular/common/locales/sl';
import {
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { AllHoursCoreModule } from './core/all-hours-core.module';

/**
 * Register angular core locales
 */
registerLocaleData(commonLocaleEn, 'en', extraLocaleEn);
registerLocaleData(commonLocaleSl, 'sl', extraLocaleSl);

const APPLICATION_ROUTES: Routes = [
  {
    canActivate: [ApplicationConfigurationGuard],
    loadChildren: () =>
      import('src/app/features/lazy/application-public-shell').then(
        (m) => m.ApplicationPublicShellModule
      ),
    path: '',
  },
  {
    canActivate: [ApplicationConfigurationGuard],
    loadChildren: () =>
      import('src/app/features/lazy/application-shell').then(
        (m) => m.ApplicationShellModule
      ),
    path: 'app',
  },
  {
    path: '**',
    redirectTo: 'url-not-found',
  },
];

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {
  ApplicationConfigurationGuard,
  LocaleProvider,
  MatLocaleProvider,
} from './core';
import { registerLocaleData } from '@angular/common';
@NgModule({
  declarations: [AppComponent],
  imports: [
    AllHoursCoreModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    MatNativeDateModule,
    RouterModule.forRoot(APPLICATION_ROUTES, {}),
  ],
  providers: [
    LocaleProvider,
    /*  MatLocaleProvider, */
    { provide: MAT_DATE_LOCALE, useValue: 'sl-SI' },
    /* { provide: LOCALE_ID, useValue: 'sl' }, */
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
