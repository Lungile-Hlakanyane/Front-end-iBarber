import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/models/LoginRequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${environment.apiBaseUrl}/auth/login`;

  constructor(private http:HttpClient) { }

  login(credentials: LoginRequest): Observable<LoginRequest> {
   return this.http.post<LoginRequest>(this.apiUrl, credentials);
  }
  
}
