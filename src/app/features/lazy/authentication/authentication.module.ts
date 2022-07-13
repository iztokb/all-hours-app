import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LocalizationModule } from 'src/app/features/shared/localization';
import { AuthenticationComponent } from './containers';
import { ModuleInitService } from './services';

const MODULE_ROUTES: Routes = [
  {
    component: AuthenticationComponent,
    path: '',
  },
];

@NgModule({
  declarations: [AuthenticationComponent],
  imports: [
    CommonModule,
    FormsModule,
    LocalizationModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    RouterModule.forChild(MODULE_ROUTES),
  ],
  providers: [ModuleInitService],
})
export class AuthenticationModule {}
