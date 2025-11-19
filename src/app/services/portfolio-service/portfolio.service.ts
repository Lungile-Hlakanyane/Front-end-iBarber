import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private apiUrl = `${environment.apiBaseUrl}/portfolios`;

  constructor( private http: HttpClient ) { }

  uploadPortfolio(userId: number, images: File[]): Observable<any> {
    const formData = new FormData();
    formData.append('userId', userId.toString());
    images.forEach((image, index) => {
      formData.append('images', image);
    });
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }

  getUserPortfolio(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  getPortfolioImagesByUserId(userId: number): Observable<string[]> {
  return this.http.get<string[]>(`https://ibarber.duckdns.org/api/portfolios/user/${userId}/images`);
}

  
}
