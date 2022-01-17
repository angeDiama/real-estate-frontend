import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ToasterContainerComponent} from "@shared/components/toaster-container/toaster-container.component";
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [ToasterContainerComponent],
  imports: [
    CommonModule,
    NgbToastModule
  ],
  exports: [ToasterContainerComponent]
})
export class SharedModule { }
