import { Injectable } from '@angular/core';
import {ApiService} from "@core/services/api/api-service";
import {catchError, map, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private endpoint = {
    advertisement: 'advertisement'
  };

  constructor(
    private apiService: ApiService
  ) {
  }

  public getAdvertisements(params?: any): Observable<any> {
    return this.apiService.get(`${this.endpoint.advertisement}`, params).pipe(
      map((res: any) => res),
      catchError(error => throwError(error))
    );
  }

  public getAdvertisement(advertisementId: any, params?: any) : Observable<any> {
    return this.apiService.get(`${this.endpoint.advertisement}/${advertisementId}`, params).pipe(
      map((res: any) => res),
      catchError(error => throwError(error))
    )
  }

  public createAdvertisement(data: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', data.get('title').value);
    formData.append('description', data.get('description').value);
    formData.append('images', file);

    return this.apiService.post(`${this.endpoint.advertisement}`, formData).pipe(
      map((res:any) => res),
      catchError(error => throwError(error))
    )
  }

  public updateAdvertisement(data: any, advertisementId: any, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('title', data.get('title').value);
    formData.append('description', data.get('description').value);
    if (file) {
      formData.append('images', file);
    }
    return this.apiService.put(`${this.endpoint.advertisement}/${advertisementId}`, formData, file).pipe(
      map((res:any) => res),
      catchError(error => throwError(error))
    )
  }

  public deleteAdvertisement(advertisementId: any, params?:any): Observable<any> {
    return this.apiService.delete(`${this.endpoint.advertisement}/${advertisementId}`, params).pipe(
      map((res: any) => res),
      catchError(error => throwError(error))
    )
  }
}
