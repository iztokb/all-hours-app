import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AllHoursCoreModule } from './core/all-hours-core.module';

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
import { ApplicationConfigurationGuard } from './core';
@NgModule({
  declarations: [AppComponent],
  imports: [
    AllHoursCoreModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    RouterModule.forRoot(APPLICATION_ROUTES),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
