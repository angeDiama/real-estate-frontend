import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgProgressModule} from "ngx-progressbar";
import {NgProgressHttpModule} from "ngx-progressbar/http";
import {HttpClientModule} from "@angular/common/http";
import {registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import {LayoutModule} from "./views/layout/layout.module";



registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgProgressModule.withConfig({
      trickleSpeed: 200,
      min: 20,
      meteor: false,
      spinner: false,
      color: '#009BDD'
    }),
    BrowserAnimationsModule,
    NgProgressHttpModule,
    HttpClientModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
