import {Component, OnDestroy, OnInit} from '@angular/core';
import {first, Subject, takeUntil} from "rxjs";
import {PropertyService} from "@views/properties/services/property.service";
import {ActivatedRoute} from "@angular/router";
import {PropertyModel} from "@views/properties/model/property.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AddPropertyComponent} from "@views/properties/add-property/add-property.component";
import {DeletePropertyComponent} from "@views/properties/delete-property/delete-property.component";
import {BehaviorService} from "@core/services/behavior/behavior.service";

@Component({
  selector: 'app-show-property',
  templateUrl: './show-property.component.html',
  styles: [
  ]
})
export class ShowPropertyComponent implements OnInit, OnDestroy {
  propertyId!: number;
  currentProperty!: PropertyModel;
  propertyPicture!: string;
  private _destroy$ = new Subject();
  constructor(
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute,
    private behaviorService: BehaviorService,
    private modalService: NgbModal,

  ) {
    this.activatedRoute
      .params
      .pipe(takeUntil(this._destroy$))
      .subscribe((params: any) => (this.propertyId = params.propertyId))
  }

  ngOnInit(): void {
    this.getProperty(this.propertyId);
    this.behaviorService.dataStream$.pipe(takeUntil(this._destroy$)).subscribe(resp => {
      if (resp && resp === true) {
        this.getProperty(this.propertyId);
      }
    });
  }

  getProperty(id: number) {
    this.propertyService
      .getAdvertisement(id)
      .pipe(first())
      .subscribe(res => {
        res.data.urlPicture = `http://localhost:3000/${res.data.urlPicture}`
        this.currentProperty = res.data;
      })
  }

  editProperty(row?: any) {
    const modalRef = this.modalService.open(AddPropertyComponent, {size: 'lg'});
    modalRef.componentInstance.title = 'Modifier l\'annonce';
    modalRef.componentInstance.btnTitle = 'Modifier';
    modalRef.componentInstance.propertyId = row ? row.id : '';
  }

  deleteProperty(row?: any) {
    const modalRef = this.modalService.open(DeletePropertyComponent, {size: 'lg'});
    modalRef.componentInstance.propertyId = row ? row.id : '';
  }

  ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

}
