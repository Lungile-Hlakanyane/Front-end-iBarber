import { Component, OnInit } from '@angular/core';
import { NavController, ToastController,ModalController, LoadingController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SuccessSubscribeComponent } from 'src/app/reuseable-components/success-subscribe/success-subscribe/success-subscribe.component';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule] 
})
export class AddCardComponent  implements OnInit {
  cardNumber: string = '';
  expiry: string = '';
  cvv: string = '';
  cardHolderName: string = '';

  constructor(
    private toastController:ToastController,
    private navController:NavController,
    private modalController:ModalController,
    private loadingController:LoadingController
  ) { }

  ngOnInit() {}

async submitPayment() {
  if (!this.cardNumber || !this.expiry || !this.cvv || !this.cardHolderName) {
    const toast = await this.toastController.create({
      message: 'Please complete all card details.',
      duration: 3000,
      color: 'danger',
      position: 'top'
    });
    return toast.present();
  }
  
  const loading = await this.loadingController.create({
    message: 'Subscribing...',
    spinner: 'circular'
  });
  await loading.present();

  setTimeout(async () => {
    await loading.dismiss();
    const toast = await this.toastController.create({
      message: 'Payment successful! You are now a premium member.',
      duration: 3000,
      color: 'success',
      position: 'top'
    });
    await toast.present();
    const modal = await this.modalController.create({
      component: SuccessSubscribeComponent,
      cssClass: 'subscribe-modal'
    });
    await modal.present();
  }, 2000); 
}

  goBack() {
    this.navController.back();
  }

}
