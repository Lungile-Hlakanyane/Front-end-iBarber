import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular'; 
import { Booking } from 'src/app/models/Booking';
import { BookingService } from 'src/app/services/booking-service/booking.service';
import { SlotService } from 'src/app/services/slot-service/slot.service';
import { SlotDTO } from 'src/app/models/SlotDTO';
import { RegisterService } from 'src/app/services/user-service/register.service';


@Component({
  selector: 'app-barber-bookings',
  templateUrl: './barber-bookings.component.html',
  styleUrls: ['./barber-bookings.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BarberBookingsComponent  implements OnInit {
  selectedTab: string = 'upcoming';
  bookings: Booking[] = [];
  searchTerm: string = '';
  createdBookings: any[] = [];
  filteredBookings: any[] = [];
  searchVisible: boolean = false;
  searchCreatedBookings: boolean = false;
  showChatButton: boolean = false;
  createdSlots: SlotDTO[] =[];

  constructor(
    private bookingService: BookingService,
    private toastController:ToastController,
    private slotService:SlotService,
    private router:Router,
    private userService:RegisterService
  ) {}

  ngOnInit(): void {
    this.loadBookings();
    // this.loadUnbookedSlots();
    this.loadBookedSlots();
  }

  toggleSearch() {
    this.searchVisible = !this.searchVisible;
  }

  toggleSearchCreatedBookings() {
    this.searchCreatedBookings = !this.searchCreatedBookings;
  } 

loadBookings(): void {
  const userId = localStorage.getItem('userId');
  if (!userId) return;
  this.bookingService.getBookings().subscribe((data) => {
    this.bookings = data.filter(booking => booking.barberId === Number(userId));
    this.bookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.filteredBookings = [...this.bookings]; 
  });
}


  async handleAction(id: number, action: 'approved' | 'declined') {
    this.bookingService.updateBookingStatus(id, action).subscribe(() => {
      const booking = this.bookings.find(b => b.id === id);
      if (booking) {
        booking.status = action;
        if (action === 'approved') {
          booking.showChatButton = true;
        }
      }
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

  navigateToChat(clientId:number){
    if (clientId) {
    this.router.navigate(['/chat', clientId]);
   }
  }

  filterBookings() {
    const term = this.searchTerm.toLowerCase();
    this.filteredBookings = this.bookings.filter(booking =>
      booking.clientName.toLowerCase().includes(term) ||
      booking.service.toLowerCase().includes(term)
    );
  }

  loadUnbookedSlots(): void {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    this.userService.getBarberIdByEmail(email).subscribe({
      next: (barberId) => {
        this.slotService.getUnbookedSlotsByBarber(barberId).subscribe({
          next: (slots) => {
            this.createdBookings = slots.map(slot => ({
              clientName: 'Not Assigned',
              service: 'Available',
              date: slot.date,
              time: `${slot.startTime} - ${slot.endTime}`,
              status: 'not-booked'
            }));
            this.createdBookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          },
          error: (err) => {
            console.error('Error loading slots:', err);
            this.showToast('Failed to load created slots');
          }
        });
      },
      error: (err) => {
        console.error('Error fetching barber ID:', err);
        this.showToast('Failed to get barber ID');
      }
    });
  }

loadBookedSlots(): void {
  const barberId = localStorage.getItem('userId');
  if (!barberId) return;

  this.slotService.getBookedSlotsByBarber(Number(barberId)).subscribe({
    next: (slots) => {
      this.createdBookings = [];

      slots.forEach(slot => {
        this.userService.getUserById(slot.clientId).subscribe({
          next: (user) => {
            this.createdBookings.push({
              id: slot.id,
              clientId: slot.clientId, 
              clientName: user.username,
              service: 'Booked',
              date: slot.date,
              time: `${slot.startTime} - ${slot.endTime}`,
              status: 'booked',
              approveAppointment: slot.approveAppointment
            });

            // Sort after all users fetched
            this.createdBookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          },
          error: (err) => {
            console.error('Error fetching client info:', err);
            this.createdBookings.push({
              id: slot.id,
              clientId: slot.clientId,
              clientName: 'Unknown', // fallback
              service: 'Booked',
              date: slot.date,
              time: `${slot.startTime} - ${slot.endTime}`,
              status: 'booked',
              approveAppointment: slot.approveAppointment
            });
          }
        });
      });
    },
    error: (err) => {
      console.error('Error loading booked slots:', err);
      this.showToast('Failed to load booked slots');
    }
  });
}


approveSlot(slotId: number) {
  this.slotService.approveAppointment(slotId).subscribe({
    next: (updatedSlot) => {
      // Update the specific slot in the list
      const index = this.createdBookings.findIndex(s => s.id === slotId);
      if (index !== -1) {
        this.createdBookings[index].status = 'Approved';
        this.createdBookings[index].approveAppointment = true;
      }
    },
    error: (err) => {
      console.error('Failed to approve slot:', err);
    }
  });
}


}
