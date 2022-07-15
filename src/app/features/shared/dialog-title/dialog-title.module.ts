import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocalizationModule } from '../localization';
import { DialogTitleComponent } from './containers';

@NgModule({
  declarations: [DialogTitleComponent],
  imports: [
    CommonModule,
    DragDropModule,
    LocalizationModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
})
export class DialogTitleModule {}
