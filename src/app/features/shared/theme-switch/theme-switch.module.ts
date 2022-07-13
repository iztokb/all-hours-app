import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LocalizationModule } from 'src/app/features/shared/localization';
import { ThemeSwitchComponent } from './containers';
import { ModuleInitService } from './services';

@NgModule({
  declarations: [ThemeSwitchComponent],
  exports: [ThemeSwitchComponent],
  imports: [
    CommonModule,
    LocalizationModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
  ],
  providers: [ModuleInitService],
})
export class ThemeSwitchModule {}
