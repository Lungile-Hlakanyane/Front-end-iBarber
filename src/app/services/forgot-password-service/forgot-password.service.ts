import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private apiUrl = 'http://localhost:8080/api/auth';
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(
    private http:HttpClient
  ) { }

sendForgotPasswordRequest(email: string): Observable<any> {
  return this.http.post(`${this.baseUrl}/request-reset`, { email }, { responseType: 'text' as 'json' });
}

verifyOtp(email: string, otp: string): Observable<any> {
  const payload = {
    email,
    otp,
    expiryTime: new Date().toISOString() 
  };
  return this.http.post(`${this.baseUrl}/verify-otp`, payload,);
}

resetPassword(token: string, newPassword: string): Observable<any> {
  return this.http.post(
    `${this.baseUrl}/reset-password`,
    { token, newPassword },
    { responseType: 'text' as 'json' }
  );
}

}
