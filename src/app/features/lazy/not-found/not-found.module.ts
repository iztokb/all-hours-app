import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './containers';

const MODULE_ROUTES: Routes = [
  {
    component: NotFoundComponent,
    path: '',
  },
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, RouterModule.forChild(MODULE_ROUTES)],
})
export class NotFoundModule {}
