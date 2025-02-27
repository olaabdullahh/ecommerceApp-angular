import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http:HttpClient) { }

  getAllPrands():Observable<any>{
   return this.http.get(`${environment.baseUrl}/api/v1/brands`)
  }
}
