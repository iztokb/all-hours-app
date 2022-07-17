import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbsenceFormComponent } from './containers';

@NgModule({
  declarations: [AbsenceFormComponent],
  exports: [AbsenceFormComponent],
  imports: [CommonModule],
})
export class SharedFormsModule {}
