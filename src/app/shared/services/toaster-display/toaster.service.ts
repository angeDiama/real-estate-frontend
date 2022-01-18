import { Injectable } from '@angular/core';
import { ToastService } from '../toaster-service/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(
    private toastService: ToastService
  ) { }

  public show(type: string, message: string) {
    let toast;
    switch(type) {
      case 'success' :
        toast = this.toastService.show(message, { classname: 'bg-primary text-white font-weight-bold', delay: 5000 });
        break;
      case 'error' :
        toast = this.toastService.show(message, { classname: 'bg-danger text-white font-weight-bold', delay: 5000 });
        break;
      case 'warning' :
        toast = this.toastService.show(message, { classname: 'bg-warning text-white font-weight-bold', delay: 5000 });
        break;
      case 'info' :
        toast = this.toastService.show(message, { classname: 'bg-secondary text-white font-weight-bold', delay: 5000 });
        break;
      default:
        toast = this.toastService.show(message, { classname: 'border border-primary font-weight-bold', delay: 5000 });
    }
    return toast;
  }
}
