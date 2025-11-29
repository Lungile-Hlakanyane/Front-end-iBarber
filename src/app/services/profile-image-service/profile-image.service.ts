import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileImageService {

  private apiUrl = `${environment.apiBaseUrl}/users`;

  constructor( private http:HttpClient) { }

  uploadProfileImage(userId: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
     return this.http.post(`${this.apiUrl}/upload-profile-image/${userId}`, formData, {
      responseType: 'text' 
    });
  }

  getProfileImage(filename: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/profile-image/${filename}`, {
      responseType: 'blob'
    });
  }

}
