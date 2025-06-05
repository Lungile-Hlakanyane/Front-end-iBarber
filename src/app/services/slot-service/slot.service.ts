import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SlotDTO } from 'src/app/models/SlotDTO';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  private apiUrl = 'http://localhost:8080/api/slots';

  constructor(private http:HttpClient) { }

  createSlot(slot: SlotDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, slot);
  }

  getCreatedSlots(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/created`);
  }

  getUnbookedSlotsByBarber(barberId: number): Observable<SlotDTO[]> {
    return this.http.get<SlotDTO[]>(`${this.apiUrl}/unbooked/barber/${barberId}`);
  }

  getSlotsByBarberId(barberId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/barber/${barberId}`);
  }

  bookSlot(slotId: number, clientId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/book/${slotId}?clientId=${clientId}`, {});
  }

  getClientBookings(clientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/client/${clientId}`);
  }

  getSlotByClientId(clientId: number): Observable<SlotDTO[]> {
    return this.http.get<SlotDTO[]>(`${this.apiUrl}/client/${clientId}`);
  }

  approveAppointment(slotId: number): Observable<SlotDTO> {
   return this.http.post<SlotDTO>(`${this.apiUrl}/${slotId}/approve`, {});
  }

  getBookedSlotsByBarber(barberId: number): Observable<SlotDTO[]> {
   return this.http.get<SlotDTO[]>(`${this.apiUrl}/slots/booked/barber/${barberId}`);
  }
  
}
