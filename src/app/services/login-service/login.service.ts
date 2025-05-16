import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/models/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:8080/api/auth/login'; 

  constructor(private http:HttpClient) { }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post(this.apiUrl, credentials);
  }
  
}
