import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupportTicketDTO } from 'src/app/models/SupportTicketDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupportTicketService {

  private apiUrl = `${environment.apiBaseUrl}/support`;

  constructor(private http: HttpClient) {}

  createTicket(ticket: SupportTicketDTO): Observable<SupportTicketDTO> {
    return this.http.post<SupportTicketDTO>(this.apiUrl, ticket);
  }

  getTicketsByUsername(username: string): Observable<SupportTicketDTO[]> {
    return this.http.get<SupportTicketDTO[]>(`${this.apiUrl}/user/${username}`);
  }

  getAllTickets(): Observable<SupportTicketDTO[]> {
    return this.http.get<SupportTicketDTO[]>(this.apiUrl);
  }

  updateTicketStatus(id: number, status: string): Observable<SupportTicketDTO> {
    return this.http.put<SupportTicketDTO>(`${this.apiUrl}/${id}/status?status=${status}`, {});
  }

}
