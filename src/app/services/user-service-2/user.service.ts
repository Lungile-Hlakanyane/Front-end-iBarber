import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/models/UserDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = `${environment.apiBaseUrl}/users`;

  constructor(private http:HttpClient) { }

  updateUser(userId: number, userData: UserDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.apiUrl}/update/${userId}`, userData);
  }

  getUserByEmail(email: string): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/user?email=${email}`);
  }

  getUserById(id: number): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.apiUrl}/${id}`);
  }
}
