import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ModalController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-rate-modal',
  templateUrl: './rate-modal.component.html',
  styleUrls: ['./rate-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class RateModalComponent  implements OnInit {

  stars = [1, 2, 3, 4, 5];
  selectedRating = 0;

  constructor(
    private modalController: ModalController,
    private loadingController: LoadingController,
    private toastController: ToastController,
  ) {}

  ngOnInit(){
   
  }

  selectRating(rating: number) {
    this.selectedRating = rating;
  }

  async submitRating() {
    const loading = await this.loadingController.create({
      message: 'Rating...',
      spinner: 'circular',
      duration: 2000 
    });
  
    await loading.present();
    await loading.onDidDismiss();
    const toast = await this.toastController.create({
      message: 'You have successfully made a rating...',
      duration: 3000,
      position: 'top',
      color: 'success'
    });
  
    await toast.present();
    await this.modalController.dismiss(this.selectedRating);
  }
  
  async dismiss() {
    await this.modalController.dismiss(null);
  }
}
