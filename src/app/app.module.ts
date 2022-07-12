import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
    RouterModule.forRoot(APPLICATION_ROUTES),
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
