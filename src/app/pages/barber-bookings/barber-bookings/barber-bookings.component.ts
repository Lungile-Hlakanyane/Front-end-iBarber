import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular'; 
import { Booking } from 'src/app/models/Booking';
import { BookingService } from 'src/app/services/booking-service/booking.service';

@Component({
  selector: 'app-barber-bookings',
  templateUrl: './barber-bookings.component.html',
  styleUrls: ['./barber-bookings.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BarberBookingsComponent  implements OnInit {

  bookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private toastController:ToastController,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe(data => this.bookings = data);
  }

  async handleAction(id: number, action: 'approved' | 'declined') {
    this.bookingService.updateBookingStatus(id, action).subscribe(() => {
      this.loadBookings();
      this.showToast(`Booking ${action}`);
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'approved': return 'success';
      case 'declined': return 'danger';
      default: return 'medium';
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      color: 'dark',
      position: 'top',
    });
    await toast.present();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}
