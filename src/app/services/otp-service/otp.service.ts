import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private http:HttpClient) { }
  
  verifyOtp(data: { otp: string; email: string }): Observable<any> {
  return this.http.post('http://13.49.76.153:8080/api/auth/verify-otp', data, {
    responseType: 'text' as 'json'
  });
}

sendForgotPasswordRequest(email: string): Observable<any> {
  return this.http.post('http://13.49.76.153:8080/api/users/request-reset', { email }, { responseType: 'text' });
}



}
