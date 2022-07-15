import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocalizationModule } from '../localization';
import { DataSettingsComponent } from './containers';
import { SearchComponent } from './components';

@NgModule({
  declarations: [DataSettingsComponent, SearchComponent],
  exports: [DataSettingsComponent],
  imports: [
    CommonModule,
    FormsModule,
    LocalizationModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class DataSettingsModule {}
