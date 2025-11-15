import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SlotDTO } from 'src/app/models/SlotDTO';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  private apiUrl = `${environment.apiBaseUrl}/slots`

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
  
  getTotalBookedSlots(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count/booked`);
  }

  countBookingsByClientId(clientId: number) {
    return this.http.get<number>(`${this.apiUrl}/bookings/count/${clientId}`);
  }

 getLastVisitDate(clientId: number): Observable<any> {
   return this.http.get(`${this.apiUrl}/last-visit/${clientId}`);
 }

 getBookingCountByBarber(barberId: number): Observable<number> {
  return this.http.get<number>(`http://13.49.76.153:8080/api/slots/count-by-barber/${barberId}`);
}

getClientCountByBarber(barberId: number): Observable<number> {
  return this.http.get<number>(`${this.apiUrl}/barber/${barberId}/clients/count`);
}



}
