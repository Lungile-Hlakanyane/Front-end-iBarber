import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { ModalController,ToastController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-report-user-modal',
  templateUrl: './report-user-modal.component.html',
  styleUrls: ['./report-user-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ReportUserModalComponent  implements OnInit {

  reasons: string[] = [
    'Inappropriate content',
    'Spam',
    'Harassment',
    'Fake profile',
    'Payment issues',
    'No-show appointment',
    'Rude or aggressive behavior',
    'Other'
  ];

  selectedReason: string = '';

  constructor(
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) { }

  async submitReason() {
    const loading = await this.loadingController.create({
      message: 'Reporting...',
      spinner: 'circular',
      duration: 2000
    });
    await loading.present();

    setTimeout(async () => {
      await loading.dismiss();

      const toast = await this.toastController.create({
        message: 'You have successfully reported this user',
        duration: 2000,
        position: 'top',
        color: 'success'
      });
      await toast.present();

      this.modalController.dismiss({ reason: this.selectedReason });
    }, 2000);
  }

  ngOnInit() {}

  dismissModal(){
    this.modalController.dismiss();
  }

}
