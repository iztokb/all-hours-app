import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationShellComponent } from './containers';
import { RouterModule, Routes } from '@angular/router';

const MODULE_ROUTES: Routes = [
  {
    component: ApplicationShellComponent,
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
  imports: [CommonModule, RouterModule.forChild(MODULE_ROUTES)],
})
export class ApplicationShellModule {}
