import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private readonly baseUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  public get(endpoint: string, options?: any): Observable<any> {
    return this.http.get(`${this.baseUrl}${endpoint}`, options);
  }

  public post(endpoint: string, payload: any, options?: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${endpoint}`, payload, options);
  }

  public put(endpoint: string, payload: any, options?: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${endpoint}`, payload, options);
  }

  public patch(endpoint: string, payload: any, options?: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}${endpoint}`, payload, options);
  }

  public delete(endpoint: string, options?: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}${endpoint}`, options);
  }
}
