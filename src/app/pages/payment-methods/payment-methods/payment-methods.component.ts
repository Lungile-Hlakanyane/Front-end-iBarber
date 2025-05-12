import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { SuccessPayModalComponent } from 'src/app/reuseable-components/successs-payment-modal/success-pay-modal/success-pay-modal.component';

@Component({
  selector: 'app-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PaymentMethodsComponent  implements OnInit {

  selectedPaymentMethod: string | null = null;

  constructor(
    private router: Router,
    private toastController: ToastController, 
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  navigate(link: string) {
    this.router.navigate([link]);
  }

  async selectPayment(method: string) {
    this.selectedPaymentMethod = method;
    const toast = await this.toastController.create({
      message: `You selected: ${method}`,
      duration: 2000,
      color: 'primary',
      position: 'top'
    });
    await toast.present();
  }

  async payNow() {
    const loading = await this.loadingController.create({
      message: 'Paying...',
      spinner: 'circular',
      duration: 2000
    });
    await loading.present();
    setTimeout(async () => {
      await loading.dismiss();
      const modal = await this.modalController.create({
        component: SuccessPayModalComponent,
        cssClass: 'bottom-modal'
      });
      await modal.present();
  
      const { role } = await modal.onDidDismiss();
      if (role !== 'cancel') {
        this.router.navigate(['/bookings']);
      }
    }, 2000);
  }
  

  goBack() {
    this.navCtrl.back();
  }

}
