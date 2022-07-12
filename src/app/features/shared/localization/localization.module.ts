import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { I18nPhrasePipe } from './pipes';
import { ModuleInitService } from './services';
import { LocalizationSelectorComponent } from './containers';

@NgModule({
  declarations: [I18nPhrasePipe, LocalizationSelectorComponent],
  exports: [I18nPhrasePipe, LocalizationSelectorComponent],
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatTooltipModule],
  providers: [ModuleInitService],
})
export class LocalizationModule {}
