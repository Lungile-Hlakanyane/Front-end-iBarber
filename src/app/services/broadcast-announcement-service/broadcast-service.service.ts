import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Announcement } from 'src/app/models/Announcement';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BroadcastServiceService {

  private apiUrl = `${environment.apiBaseUrl}/announcements`

  constructor(private http: HttpClient) { }

  getAllAnnouncements(): Observable<Announcement[]> {
    return this.http.get<Announcement[]>(`${this.apiUrl}/all`);
  }

  sendAnnouncement(announcement: Announcement): Observable<Announcement> {
    return this.http.post<Announcement>(`${this.apiUrl}/send`, announcement);
  }
  
}
