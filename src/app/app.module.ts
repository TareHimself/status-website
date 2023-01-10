import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StatusWidgetComponent } from './status-widget/status-widget.component';
import { StatusBarComponent } from './status-bar/status-bar.component';
import { StatusApiService } from './services/status-api.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StatusWidgetComponent,
    StatusBarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [StatusApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
