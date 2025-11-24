import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SlotService } from 'src/app/services/slot-service/slot.service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class BookAppointmentComponent  implements OnInit {

  barberId: string | null = null;

  availableDates: string[] = [];
  availableTimes: string[] = [];

  selectedDate: string | null = null;
  selectedTime: string | null = null;

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController, 
    private router: Router,
    private route:ActivatedRoute,
    private slotService:SlotService,
    private loadingController:LoadingController
  ) {}

  selectDate(date: string) {
    this.selectedDate = date;
    this.updateAvailableTimes(); // <-- add this line
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  async bookAppointment() {
    // Show loading spinner
    const loading = await this.loadingController.create({
      message: 'Booking...',
      spinner: 'circular'
    });
    await loading.present();
  
    // Step 1: Get clientId from localStorage
    const clientId = Number(localStorage.getItem('userId'));
    if (!clientId) {
      await loading.dismiss();
      const errorToast = await this.toastController.create({
        message: 'User not logged in!',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await errorToast.present();
      return;
    }
  
    // Step 2: Find slotId based on selectedDate and selectedTime
    this.slotService.getSlotsByBarberId(this.barberId!).subscribe(async (slots: any[]) => {
      const selectedSlot = slots.find(slot => {
        const slotDate = new Date(slot.date).toDateString();
        const slotTime = slot.startTime.substring(0, 5) + ' - ' + slot.endTime.substring(0, 5);
        return slotDate === this.selectedDate && slotTime === this.selectedTime;
      });
  
      if (!selectedSlot) {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Selected slot not found.',
          duration: 2000,
          color: 'danger',
          position: 'top'
        });
        await toast.present();
        return;
      }
  
      // Step 3: Book the slot using slotId and clientId
      this.slotService.bookSlot(selectedSlot.id, clientId).subscribe({
        next: async () => {
          await loading.dismiss();
          const toast = await this.toastController.create({
            message: 'Appointment booked successfully',
            duration: 1500,
            color: 'success',
            position: 'top'
          });
          await toast.present();
          setTimeout(() => {
            this.navCtrl.navigateForward('/payment-methods');
          }, 1500);
        },
       error: async (err) => {
        await loading.dismiss();
         let errorMessage = 'Failed to book appointment.';
         if (err.status === 409) {
         errorMessage = 'This slot has already been booked. Please choose another one.';
        } else if (err.status === 404) {
        errorMessage = 'Slot not found. Please refresh and try again.';
       }
        const toast = await this.toastController.create({
        message: errorMessage,
        duration: 3000,
        color: 'danger',
        position: 'top'
       });
       await toast.present();
       }
      });
    });
  }

  ngOnInit() {
    this.barberId = this.route.snapshot.paramMap.get('barberId');
    if (this.barberId) {
      this.fetchSlots(this.barberId);
    }
  }

  slotsByDate: { [date: string]: string[] } = {};


 fetchSlots(barberId: string) {
  this.slotService.getSlotsByBarberId(barberId).subscribe((slots: any[]) => {
    const dateSet = new Set<string>();
    this.slotsByDate = {};
    slots.forEach(slot => {
      if (!slot.booked) { // ✅ only include unbooked slots
        const date = new Date(slot.date).toDateString();
        const time = slot.startTime.substring(0, 5) + ' - ' + slot.endTime.substring(0, 5);
        dateSet.add(date);
        if (!this.slotsByDate[date]) {
          this.slotsByDate[date] = [];
        }
        this.slotsByDate[date].push(time);
      }
    });
    this.availableDates = Array.from(dateSet);
    this.updateAvailableTimes();
  });
}
  
  updateAvailableTimes() {
    if (this.selectedDate && this.slotsByDate[this.selectedDate]) {
      this.availableTimes = this.slotsByDate[this.selectedDate];
    } else {
      this.availableTimes = [];
    }
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }

  goBack() {
    this.navCtrl.back();
  }

}
