import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AllHoursCoreModule } from './core/all-hours-core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
@NgModule({
  declarations: [AppComponent],
  imports: [AllHoursCoreModule.forRoot(), AppRoutingModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
