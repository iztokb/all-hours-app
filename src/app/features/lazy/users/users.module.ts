import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataSettingsModule } from 'src/app/features/shared/data-settings';
import { DialogTitleModule } from 'src/app/features/shared/dialog-title';
import { LocalizationModule } from 'src/app/features/shared/localization';
import { PopUpContainerComponent, UsersContainerComponent } from './containers';
import { UsersModuleEffects, UsersModuleReducer } from './store';
import { UserFormComponent, UsersListItemComponent } from './component';

const MODULE_ROUTES: Routes = [
  {
    component: UsersContainerComponent,
    path: '',
  },
];

@NgModule({
  declarations: [
    PopUpContainerComponent,
    UserFormComponent,
    UsersContainerComponent,
    UsersListItemComponent,
  ],
  imports: [
    CommonModule,
    DataSettingsModule,
    DialogTitleModule,
    EffectsModule.forFeature(UsersModuleEffects),
    FormsModule,
    LocalizationModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    RouterModule.forChild(MODULE_ROUTES),
    ScrollingModule,
    StoreModule.forFeature('users', UsersModuleReducer),
  ],
})
export class UsersModule {}
