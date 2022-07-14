import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SettingsContainerComponent } from './containers';

const MODULE_ROUTES: Routes = [
  {
    component: SettingsContainerComponent,
    path: '',
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(MODULE_ROUTES)],
})
export class SettingsModule {}
