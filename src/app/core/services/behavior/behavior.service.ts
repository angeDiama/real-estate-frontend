import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {
  private data = new BehaviorSubject<any>(null);
  dataStream$ = this.data.asObservable();

  constructor() { }

  updateData(params: any) {
    this.data.next(params);
  }
}
