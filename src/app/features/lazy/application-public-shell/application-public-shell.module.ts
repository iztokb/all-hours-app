import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LocalizationModule } from 'src/app/features/shared/localization';
import { ThemeSwitchModule } from 'src/app/features/shared/theme-switch';
import { PublicShellComponent } from './containers';
import { BrowserGuard, IsAlreadyAuthenticatedGuard } from 'src/app/core';

const MODULE_ROUTES: Routes = [
  {
    component: PublicShellComponent,
    path: '',
    children: [
      {
        canActivate: [BrowserGuard, IsAlreadyAuthenticatedGuard],
        loadChildren: () =>
          import('src/app/features/lazy/authentication').then(
            (m) => m.AuthenticationModule
          ),
        path: 'authentication',
      },
      {
        canActivate: [BrowserGuard],
        loadChildren: () =>
          import('src/app/features/lazy/not-found').then(
            (m) => m.NotFoundModule
          ),
        path: 'url-not-found',
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'authentication',
      },
    ],
  },
];

@NgModule({
  declarations: [PublicShellComponent],
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
export class ApplicationPublicShellModule {}
