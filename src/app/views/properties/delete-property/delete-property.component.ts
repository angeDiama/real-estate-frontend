import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {BehaviorService} from "@core/services/behavior/behavior.service";
import {ToasterService} from "@shared/services/toaster-display/toaster.service";
import {PropertyService} from "@views/properties/services/property.service";
import {first} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-delete-property',
  templateUrl: './delete-property.component.html',
  styles: [
  ]
})
export class DeletePropertyComponent implements OnInit {
  @Input() propertyId!: string;
  constructor(
    public activeModal: NgbActiveModal,
    private propertyService: PropertyService,
    private router: Router,
    private toasterService: ToasterService,
    private behaviorService: BehaviorService
  ) { }

  ngOnInit(): void {
  }

  public deleteAdvertisement() {
    this.propertyService
      .deleteAdvertisement(this.propertyId)
      .pipe(first())
      .subscribe(res => {
        this.activeModal.close('close modal');
        this.behaviorService.updateData(true);
        this.toasterService.show('success','Annonce suprimé');
        this.router.navigate(['/annonces'])
      })
  }

}
