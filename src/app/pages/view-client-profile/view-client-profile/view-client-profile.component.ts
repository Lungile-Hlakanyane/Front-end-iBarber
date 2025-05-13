import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { Client } from 'src/app/models/Client';
import { AlertController,ToastController,LoadingController,ModalController } from '@ionic/angular';
import { ReportUserModalComponent } from 'src/app/reuseable-components/report-user-modal/report-user-modal/report-user-modal.component';

@Component({
  selector: 'app-view-client-profile',
  templateUrl: './view-client-profile.component.html',
  styleUrls: ['./view-client-profile.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewClientProfileComponent  implements OnInit {
  @Input() client!: Client;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController  
  ) { }

  ngOnInit() {
    if (!this.client) {
      this.client = {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "123-456-7890",
        service: "Haircut",
        bookingDate: "2025-05-12",
        status: "active",
        history: [
          "Booking 1 - 2025-04-01",
          "Booking 2 - 2025-04-15",
          "Booking 3 - 2025-05-01",
        ],
      };
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'danger';
      default:
        return 'medium';
    }
  }

  navigate(link:string){
    this.router.navigate([link]);
  }

  async block() {
    const alert = await this.alertController.create({
      header: 'Confirm Block',
      message: 'Are you sure you want to block this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Blocking...',
              spinner: 'crescent',
              duration: 2000 // Simulate a 2-second operation
            });
            await loading.present();
  
            // Simulate blocking delay
            setTimeout(async () => {
              await loading.dismiss();
  
              const toast = await this.toastController.create({
                message: 'You have successfully blocked this user...',
                duration: 2500,
                position: 'top',
                color: 'success'
              });
  
              await toast.present();
              this.client.status = 'inactive';
            }, 2000);
          }
        }
      ]
    });
  
    await alert.present();
  }
  

  async openReportModal() {
    const modal = await this.modalController.create({
      component: ReportUserModalComponent,
      cssClass: 'bottom-modal'
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data?.reason) {
      console.log('Selected reason:', data.reason);
      // You can now call your block-user API or perform an action here.
    }
  }

}
