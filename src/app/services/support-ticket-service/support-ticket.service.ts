import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupportTicketDTO } from 'src/app/models/SupportTicketDTO';

@Injectable({
  providedIn: 'root'
})
export class SupportTicketService {

  private baseUrl = 'http://localhost:8080/api/support';

  constructor(private http: HttpClient) {}

  createTicket(ticket: SupportTicketDTO): Observable<SupportTicketDTO> {
    return this.http.post<SupportTicketDTO>(this.baseUrl, ticket);
  }

  getTicketsByUsername(username: string): Observable<SupportTicketDTO[]> {
    return this.http.get<SupportTicketDTO[]>(`${this.baseUrl}/user/${username}`);
  }

  getAllTickets(): Observable<SupportTicketDTO[]> {
    return this.http.get<SupportTicketDTO[]>(this.baseUrl);
  }

  updateTicketStatus(id: number, status: string): Observable<SupportTicketDTO> {
    return this.http.put<SupportTicketDTO>(`${this.baseUrl}/${id}/status?status=${status}`, {});
  }

}
