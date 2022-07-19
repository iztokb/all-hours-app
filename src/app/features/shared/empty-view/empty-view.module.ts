import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { LocalizationModule } from 'src/app/features/shared/localization';
import { EmptyViewComponent } from './containers';

@NgModule({
  declarations: [EmptyViewComponent],
  exports: [EmptyViewComponent],
  imports: [CommonModule, LocalizationModule, MatIconModule],
})
export class EmptyViewModule {}
