import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PropertiesListComponent} from "./properties-list/properties-list.component";
import {ShowPropertyComponent} from "./show-property/show-property.component";

const routes: Routes = [
  {path: '', redirectTo: 'liste', pathMatch: 'full'},
  {path: 'liste', component: PropertiesListComponent, data: {title: "Annonces imobilières", subtitle: 'Liste des annonces'}},
  {path: 'details/:propertyId', component: ShowPropertyComponent, data: {title: "Annonces imobilières", subtitle: 'détails'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule { }
