import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class BookAppointmentComponent  implements OnInit {

  availableDates: string[] = ['May 13', 'May 14', 'May 15', 'May 16', 'May 17'];
  availableTimes: string[] = ['9:00 AM', '10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM'];

  selectedDate: string | null = null;
  selectedTime: string | null = null;

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController, 
    private router: Router
  ) {}

  selectDate(date: string) {
    this.selectedDate = date;
  }

  selectTime(time: string) {
    this.selectedTime = time;
  }

  async bookAppointment() {
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
  }
  

  ngOnInit() {}

  navigate(link: string) {
    this.router.navigate([link]);
  }

  goBack() {
    this.navCtrl.back();
  }

}
