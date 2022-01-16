import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base/base.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import {RouterModule} from "@angular/router";
import {FeahterIconModule} from "../../core/directives/feather-icon/feather-icon.module";
import {ContentAnimateDirective} from "../../core/directives/content-animate/content-animate.directive";
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";



@NgModule({
  declarations: [
    BaseComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    ContentAnimateDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FeahterIconModule,
    MatButtonModule,
    MatBadgeModule
  ],
  exports: [ContentAnimateDirective]
})
export class LayoutModule { }
