import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private apiUrl = `${environment.apiBaseUrl}/users`;

  constructor(
    private http:HttpClient
  ) { }

sendForgotPasswordRequest(email: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/request-reset`, { email }, { responseType: 'text' as 'json' });
}

verifyOtp(email: string, otp: string): Observable<any> {
  const payload = {
    email,
    otp,
    expiryTime: new Date().toISOString() 
  };
  return this.http.post(`${this.apiUrl}/verify-otp`, payload,);
}

resetPassword(token: string, newPassword: string): Observable<any> {
  return this.http.post(
    `${this.apiUrl}/reset-password`,
    { token, newPassword },
    { responseType: 'text' as 'json' }
  );
}

}
