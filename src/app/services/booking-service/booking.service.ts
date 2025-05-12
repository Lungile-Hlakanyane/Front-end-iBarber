import { Injectable } from '@angular/core';
import { Booking } from 'src/app/models/Booking';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private bookings: Booking[] = [
    { id: 1, clientName: 'John Doe', service: 'Haircut', date: '2025-05-15', time: '10:00 AM', status: 'pending' },
    { id: 2, clientName: 'Jane Smith', service: 'Beard Trim', date: '2025-05-16', time: '2:00 PM', status: 'pending' },
    { id: 3, clientName: 'Mike Johnson', service: 'Shave', date: '2025-05-17', time: '11:30 AM', status: 'pending' },
    { id: 4, clientName: 'Sara Lee', service: 'Haircut', date: '2025-05-18', time: '1:00 PM', status: 'pending' },
    { id: 5, clientName: 'Chris Martin', service: 'Haircut & Beard Trim', date: '2025-05-19', time: '3:15 PM', status: 'pending' },
    { id: 6, clientName: 'Nina Brown', service: 'Fade', date: '2025-05-20', time: '9:45 AM', status: 'pending' },
    { id: 7, clientName: 'Alex Turner', service: 'Beard Trim', date: '2025-05-21', time: '4:30 PM', status: 'pending' },
    { id: 8, clientName: 'Emma Wilson', service: 'Haircut', date: '2025-05-22', time: '12:00 PM', status: 'pending' },
    { id: 9, clientName: 'David Kim', service: 'Shave', date: '2025-05-23', time: '2:30 PM', status: 'pending' },
    { id: 10, clientName: 'Linda Scott', service: 'Haircut & Styling', date: '2025-05-24', time: '10:30 AM', status: 'pending' },
  ];
  

  constructor() { }

  getBookings(): Observable<Booking[]> {
    return of(this.bookings);
  }

  updateBookingStatus(id: number, status: 'approved' | 'declined'): Observable<any> {
    const booking = this.bookings.find(b => b.id === id);
    if (booking) {
      booking.status = status;
      return of({ success: true, booking });
    } else {
      return of({ success: false, message: 'Booking not found' });
    }
  }
  
}
