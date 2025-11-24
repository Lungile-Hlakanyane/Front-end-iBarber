import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { RegisterService } from 'src/app/services/user-service/register.service';
import { SlotService } from 'src/app/services/slot-service/slot.service';
import { SlotDTO } from 'src/app/models/SlotDTO';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BookingsComponent  implements OnInit {
  selectedSegment: string = 'upcoming';
  bookingTab: any;
  bookingHistory: any;
  user: any = null;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private registerService:RegisterService,
    private slotService:SlotService
  ) { }

  ngOnInit() {
    this.fetchUserDetails();
  }

  navigate(link:string){
    this.router.navigate([link]);
  }

  upcomingBookings: any = [];

  onSegmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }


  async cancel(booking: any) {
  const alert = await this.alertController.create({
    header: 'Cancel Appointment',
    message: 'Are you sure you want to cancel this appointment?',
    buttons: [
      {
        text: 'No',
        role: 'cancel'
      },
      {
        text: 'Yes',
        handler: async () => {
          const loading = await this.loadingController.create({
            message: 'Cancelling appointment...',
            spinner: 'circular'
          });
          await loading.present();

          this.slotService.cancelSlot(booking.id).subscribe({
            next: async () => {
              await loading.dismiss();

              const toast = await this.toastController.create({
                message: 'Appointment cancelled successfully.',
                duration: 3000,
                color: 'success',
                position: 'top'
              });
              await toast.present();

              // Remove from current view or mark as cancelled
              this.upcomingBookings = this.upcomingBookings.filter(
                (b: any) => b.id !== booking.id
              );
            },
            error: async (err) => {
              await loading.dismiss();
              const toast = await this.toastController.create({
                message: 'Failed to cancel appointment. Please try again.',
                duration: 3000,
                color: 'danger',
                position: 'top'
              });
              await toast.present();
              console.error(err);
            }
          });
        }
      }
    ]
  });
  await alert.present();
}

  

  rebook(booking: any) {
    console.log('Rebook clicked for', booking);
  }

  fetchUserDetails(){
    const email = localStorage.getItem('userEmail');
    if (email) {
      this.registerService.getUserByEmail(email).subscribe({
        next: (data) => {
          this.user = data;
          this.fetchBookings(this.user.id);
        },
        error: (err) => {
          console.error('Error fetching user data:', err);
        }
      });
    }
  }

  fetchBookings(clientId: number) {
    this.slotService.getSlotByClientId(clientId).subscribe({
      next: (data) => {
        this.upcomingBookings = data.map((slot: any) => ({
          id: slot.id,
          username: slot.barber?.username || 'Unknown Barber',
          date: slot.date,
          time: slot.startTime,
          status: slot.approveAppointment ? 'approved' : 'waiting',
          approveAppointment: slot.approveAppointment,
          barberId: slot.barber?.id 
        }));
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      }
    });
  }

  async navigateToChat(booking: any) {
  if (!booking.approveAppointment) {
    const toast = await this.toastController.create({
      message: 'Cannot chat until the barber approves this booking.',
      duration: 3000,
      color: 'warning',
      position: 'top'
    });
    await toast.present();
    return;
  }
  if (booking.barberId) {
    this.router.navigate(['/chat', booking.barberId]);
  } else {
    console.warn('Barber ID is missing for this booking');
  }
}



}
