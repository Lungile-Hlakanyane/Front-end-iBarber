import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor( private http:HttpClient) { }

  // uploadProfileImage(userId: number, file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   return this.http.post(`${this.baseUrl}/upload-profile-image/${userId}`, formData);
  // }

uploadProfileImage(userId: number, file: File): Observable<string> {
  const formData = new FormData();
  formData.append('file', file);
  return this.http.post(`${this.baseUrl}/upload-profile-image/${userId}`, formData, {
    responseType: 'text' // <-- Important
  });
}


  getProfileImage(filename: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/profile-image/${filename}`, {
      responseType: 'blob'
    });
  }

}
