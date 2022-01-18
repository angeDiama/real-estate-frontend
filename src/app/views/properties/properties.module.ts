import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertiesRoutingModule } from './properties-routing.module';
import { PropertiesListComponent } from './properties-list/properties-list.component';
import { ShowPropertyComponent } from './show-property/show-property.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { DeletePropertyComponent } from './delete-property/delete-property.component';
import {MatTableModule} from "@angular/material/table";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {FeahterIconModule} from "@core/directives/feather-icon/feather-icon.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SharedModule} from "@shared/shared.module";
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PropertiesListComponent,
    ShowPropertyComponent,
    AddPropertyComponent,
    DeletePropertyComponent
  ],
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    MatTableModule,
    FeahterIconModule,
    SharedModule,
    NgbTooltipModule,
    MatPaginatorModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class PropertiesModule { }
