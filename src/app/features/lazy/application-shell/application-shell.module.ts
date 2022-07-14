import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LocalizationModule } from 'src/app/features/shared/localization';
import { ThemeSwitchModule } from 'src/app/features/shared/theme-switch';
import { AuthenticationGuard } from 'src/app/core';
import { ApplicationShellComponent } from './containers';

const MODULE_ROUTES: Routes = [
  {
    component: ApplicationShellComponent,
    canActivate: [AuthenticationGuard],
    path: '',
    /* children: [
      {
        canActivate: [BrowserGuard],
        loadChildren: () =>
          import('src/app/features/lazy/authentication').then(
            (m) => m.AuthenticationModule
          ),
        path: 'app',
      },
      {
        canActivate: [BrowserGuard],
        loadChildren: () =>
          import('src/app/features/lazy/not-found').then(
            (m) => m.NotFoundModule
          ),
        path: 'url-not-found',
      },
    ], */
  },
];

@NgModule({
  declarations: [ApplicationShellComponent],
  imports: [
    CommonModule,
    LocalizationModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterModule.forChild(MODULE_ROUTES),
    ThemeSwitchModule,
  ],
})
export class ApplicationShellModule {}
