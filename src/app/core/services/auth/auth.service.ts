import { jwtDecode } from "jwt-decode";
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any = null
private readonly router = inject(Router)
  constructor(private http:HttpClient) { }

  sendRegisterForm(data:object):Observable<any>{
    return this.http.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }
  sendLoginForm(data:object):Observable<any>{
    return this.http.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
  }
saveToken():void{
  if(localStorage.getItem("userToken") !==null){
this.userData = jwtDecode(localStorage.getItem("userToken")!)
   console.log( this.userData);
  
   
  }
}
logOut():void{
  localStorage.removeItem('userToken')
  this.userData = null
  setTimeout(() => {
    this.router.navigate(['/login'])
  }, 500);
}
forgotPassword(data:object):Observable<any>{
  return this.http.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data)
}
resetCode(data:object):Observable<any>{
  return this.http.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
}
resetPassword(data:object):Observable<any>{
  return this.http.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
}
}




