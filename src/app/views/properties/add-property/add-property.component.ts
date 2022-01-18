import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PropertyService} from "@views/properties/services/property.service";
import {first, Observable} from "rxjs";
import {ToasterService} from "@shared/services/toaster-display/toaster.service";
import {BehaviorService} from "@core/services/behavior/behavior.service";

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
})
export class AddPropertyComponent implements OnInit, AfterViewInit {

  propertyForm!: FormGroup;
  isSubmitted!: boolean;
  @Input() title !: string;
  @Input() btnTitle !: string;
  @Input() propertyId !: string;
  identityFilename!: any;
  hasIdentityFile!: boolean;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private toasterService: ToasterService,
    private behaviorService: BehaviorService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit() {
    this.getCurrentAdvertisement(this.propertyId);
  }

  initForm() {
    this.propertyForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
    }, {updateOn: 'submit'})
  }

  private getCurrentAdvertisement(id: any) {
    this.propertyService
      .getAdvertisement(id)
      .pipe(first())
      .subscribe(res => {
        this.propertyForm.patchValue(res.data);
      });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.propertyForm.invalid) {
      return;
    }
    const data = this.propertyForm;
    const fileData = this.identityFilename;
    const message = this.propertyId ? 'Annonce modifiée avec succès' : 'Annonce crée avec succès';

    let observable: Observable<any>;
    observable = this.propertyId
      ? this.propertyService.updateAdvertisement(data, this.propertyId, fileData)
      : this.propertyService.createAdvertisement(data, fileData );

    observable.pipe(first())
      .subscribe(res => {
          this.toasterService.show('success', `${message}`);
          this.propertyForm.reset();
          this.activeModal.close('close modal');
          this.behaviorService.updateData(true);
        },
        error => {
          console.log(error)
          const violations = error?.message;
          this.handleHttpFormErrors(this.propertyForm, violations);
        }
      );
  }

  public handleHttpFormErrors(formGroup: FormGroup, violations: string) {
    formGroup.controls['title']?.setErrors({httpError: violations});
  }

 public identityUpload(file: FileList) {
    if (file && file.length) {
      this.identityFilename = file.item(0);
      this.hasIdentityFile = true;
    }
  }
 public removeImg() {
    this.identityFilename = '';
  }
}
