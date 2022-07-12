import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationComponent } from './containers';
import { RouterModule, Routes } from '@angular/router';

const MODULE_ROUTES: Routes = [
  {
    component: AuthenticationComponent,
    path: '',
  },
];

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [CommonModule, RouterModule.forChild(MODULE_ROUTES)],
})
export class AuthenticationModule {}
