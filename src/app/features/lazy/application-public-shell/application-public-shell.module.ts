import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PublicShellComponent } from './containers';
import { BrowserGuard } from 'src/app/core';

const MODULE_ROUTES: Routes = [
  {
    component: PublicShellComponent,
    path: '',
    children: [
      {
        canActivate: [BrowserGuard],
        loadChildren: () =>
          import('src/app/features/lazy/not-found').then(
            (m) => m.NotFoundModule
          ),
        path: 'url-not-found',
      },
    ],
  },
];

@NgModule({
  declarations: [PublicShellComponent],
  imports: [CommonModule],
})
export class ApplicationPublicShellModule {}
