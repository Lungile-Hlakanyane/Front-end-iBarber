import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  private apiUrl = 'http://localhost:8080/api/users/verify-otp';

  constructor(private http:HttpClient) { }
  
  verifyOtp(data: { otp: string; email: string }): Observable<any> {
    return this.http.post(this.apiUrl, data, { responseType: 'text' });
  }
}
