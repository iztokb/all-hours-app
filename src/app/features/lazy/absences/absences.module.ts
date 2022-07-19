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
import { MatTooltipModule } from '@angular/material/tooltip';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DataSettingsModule } from 'src/app/features/shared/data-settings';
import { DialogTitleModule } from 'src/app/features/shared/dialog-title';
import { EmptyViewModule } from 'src/app/features/shared/empty-view';
import { SharedFormsModule } from 'src/app/features/shared/forms';
import { LocalizationModule } from 'src/app/features/shared/localization';
import {
  AbsencesContainerComponent,
  PopUpContainerComponent,
} from './containers';
import { ModuleInitService } from './services';
import { AbsencesModuleEffects, AbsencesModuleReducer } from './store';
import { AbsencesListItemComponent } from './components';
import { ValidateAbsenceFormRecordInputPipe } from './pipes';

const MODULE_ROUTES: Routes = [
  {
    component: AbsencesContainerComponent,
    path: '',
  },
];

@NgModule({
  declarations: [
    AbsencesContainerComponent,
    AbsencesListItemComponent,
    PopUpContainerComponent,
    ValidateAbsenceFormRecordInputPipe,
  ],
  imports: [
    CommonModule,
    DataSettingsModule,
    DialogTitleModule,
    EffectsModule.forFeature(AbsencesModuleEffects),
    EmptyViewModule,
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
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule.forChild(MODULE_ROUTES),
    ScrollingModule,
    SharedFormsModule,
    StoreModule.forFeature('absences', AbsencesModuleReducer),
  ],
  providers: [ModuleInitService],
})
export class AbsencesModule {}
