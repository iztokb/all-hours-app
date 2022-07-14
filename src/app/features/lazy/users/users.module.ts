import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UsersContainerComponent } from './containers';

const MODULE_ROUTES: Routes = [
  {
    component: UsersContainerComponent,
    path: '',
  },
];

@NgModule({
  declarations: [UsersContainerComponent],
  imports: [CommonModule, RouterModule.forChild(MODULE_ROUTES)],
})
export class UsersModule {}
