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

  reschedule(booking: any) {
   this.router.navigate(['/book-appointment']);
  }

  async cancel(booking: any) {
    const alert = await this.alertController.create({
      header: 'Cancel Appointment',
      message: 'Are you sure you want to cancel this appointment?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancellation aborted');
          }
        },
        {
          text: 'Yes',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Cancelling...',
              spinner: 'circular',
              duration: 2000 // Simulates the cancellation time
            });
            await loading.present();
  
            setTimeout(async () => {
              await loading.dismiss();
  
              const toast = await this.toastController.create({
                message: 'You have successfully cancelled this appointment.',
                duration: 3000,
                color: 'success',
                position: 'top'
              });
              await toast.present();
              booking.status = 'cancelled';
            }, 2000);
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
          username: slot.barber?.username || 'Unknown Barber',
          date: slot.date,
          time: slot.startTime,
          status: 'pending'
        }));
      },
      error: (err) => {
        console.error('Error fetching bookings:', err);
      }
    });
  }

}
