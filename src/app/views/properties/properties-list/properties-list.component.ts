import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {ToasterService} from "@shared/services/toaster-display/toaster.service";
import {PropertyService} from "@views/properties/services/property.service";
import {first} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {AddPropertyComponent} from "@views/properties/add-property/add-property.component";
import {DeletePropertyComponent} from "@views/properties/delete-property/delete-property.component";
import {BehaviorService} from "@core/services/behavior/behavior.service";
import {PropertyModel} from "@views/properties/model/property.model";

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styles: []
})
export class PropertiesListComponent implements OnInit {
  displayedColumns: string[] = ['picture','title', 'description', 'createdAt', 'actions'];
  dataSource = new MatTableDataSource<PropertyModel>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private modalService: NgbModal,
    private toasterService: ToasterService,
    private propertyService: PropertyService,
    private behaviorService: BehaviorService

  ) { }

  ngOnInit(): void {
    this.getAdvertisements();
    this.behaviorService.dataStream$.subscribe(resp => {
      if (resp && resp === true) {
        this.getAdvertisements();
      }
    })
  }

  public getAdvertisements() {
    this.propertyService
      .getAdvertisements()
      .pipe(first())
      .subscribe((res: any) => {
        this.dataSource.data = res.data;
        this.dataSource.data.forEach((elem: any) => {
          if(elem.urlPicture.includes('http://localhost:3000/')) {
          return elem.urlPicture;
          } else {
            elem.urlPicture = `http://localhost:3000/${elem.urlPicture}`;
          }

        })
        this.dataSource.paginator = this.paginator;
        this.dataSource.filterPredicate = (data, filter) => {
          return  data?.id?.toLowerCase()?.includes(filter) ||
            data?.title?.toLowerCase()?.includes(filter)  ||
            data?.description?.toLowerCase()?.includes(filter) ;
        };
      })
  }

  applyFilter(filterValue: string) : any {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createProperty(row?: any) {
    const modalRef = this.modalService.open(AddPropertyComponent, {size: 'lg'});
    modalRef.componentInstance.title = row && row.id ? 'Modifier l\'annonce' : 'Cr??er une annonce';
    modalRef.componentInstance.btnTitle = row && row.id ? 'Modifier' : 'Cr??er';
    modalRef.componentInstance.propertyId = row ? row.id : '';
  }

  deleteProperty(row?: any) {
    const modalRef = this.modalService.open(DeletePropertyComponent, {size: 'lg'});
    modalRef.componentInstance.propertyId = row ? row.id : '';
  }

}
