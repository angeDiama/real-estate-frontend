import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { ShowPropertyComponent } from './show-property/show-property.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { DeletePropertyComponent } from './delete-property/delete-property.component';


@NgModule({
  declarations: [
    PropertiesListComponent,
    ShowPropertyComponent,
    AddPropertyComponent,
    DeletePropertyComponent
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule
  ]
})
export class PropertiesModule { }
