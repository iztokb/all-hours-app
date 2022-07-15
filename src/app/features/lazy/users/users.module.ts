import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataSettingsModule } from 'src/app/features/shared/data-settings';
import { LocalizationModule } from 'src/app/features/shared/localization';
import { UsersContainerComponent } from './containers';
import { UsersModuleEffects, UsersModuleReducer } from './store';

const MODULE_ROUTES: Routes = [
  {
    component: UsersContainerComponent,
    path: '',
  },
];

@NgModule({
  declarations: [UsersContainerComponent],
  imports: [
    CommonModule,
    DataSettingsModule,
    EffectsModule.forFeature(UsersModuleEffects),
    LocalizationModule,
    RouterModule.forChild(MODULE_ROUTES),
    StoreModule.forFeature('users', UsersModuleReducer),
  ],
})
export class UsersModule {}
