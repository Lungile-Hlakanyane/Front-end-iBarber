import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = 'http://localhost:8080/api/users';
  private apiUrl = 'http://localhost:8080/api/users/user';

  constructor(private http:HttpClient) { }

  registerUser(user: User): Observable<string> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.baseUrl}/register`, user, { headers, responseType: 'text' });
  }

  getUserByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?email=${email}`);
  }

  getBarberIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(`http://localhost:8080/api/slots/barber-id?email=${email}`);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/all`);
  }

  deleteUserById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAllBarbers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/barbers`);
  }

  getUserById(id: number) {
    return this.http.get<any>(`http://localhost:8080/api/users/${id}`);
  }

  getUserCount(): Observable<number> {
  return this.http.get<number>('http://localhost:8080/api/users/count');
 }

 
  
}
