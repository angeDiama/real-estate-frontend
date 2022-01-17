import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * 'Default API Url
   */
  private url: string = environment.apiUrl;

  /**
   * Api Service Constructor
   */
  constructor(public http: HttpClient) {}

  /**
   * GET verb action
   */
  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
      };
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  /**
   * POST verb action
   */
  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  /**
   * PUT verb action
   */
  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  /**
   * PATCH verb action
   */
  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }

  /**
   * DELETE verb action
   */
  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }
}
