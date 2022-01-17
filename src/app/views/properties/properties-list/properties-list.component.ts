import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ToasterService} from "@shared/services/toaster-display/toaster.service";

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styles: []
})
export class PropertiesListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'description', 'actions'];
  dataSource = new MatTableDataSource<any>();
  constructor(
    private toasterService: ToasterService,

  ) { }

  ngOnInit(): void {
    this.toasterService.show('success', `hello`);
  }

}
