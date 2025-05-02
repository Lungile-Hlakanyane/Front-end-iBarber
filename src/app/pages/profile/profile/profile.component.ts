import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController,ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PersonalInfoModalComponent } from 'src/app/reuseable-components/personal-infor-modal/personal-info-modal/personal-info-modal.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProfileComponent  implements OnInit {

  constructor(
    private router: Router,
    private actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  navigate(link:string){
    this.router.navigate([link]); 
  }

  async openNotificationSettings() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Notification Settings',
      cssClass: 'notification-action-sheet',
      buttons: [
        {
          text: 'Turn on Notifications',
          role: 'toggle',
          handler: () => {
           this.turnOnNotifications();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }
  
  async turnOnNotifications() {
    const loading = await this.loadingController.create({
      message: 'Turning on notifications...',
      duration: 2000
    });
    await loading.present();
    await new Promise(resolve => setTimeout(resolve, 2000));
    const toast = await this.toastController.create({
      message: 'You have successfully turned on notifications...',
      duration: 3000,
      position: 'top',
      color: 'success'
    });
    await toast.present();
  }

  async openEditUserModal() {
    const modal = await this.modalController.create({
      component: PersonalInfoModalComponent,
      cssClass: 'bottom-modal',
      backdropDismiss: true,
      componentProps: {
        userData: {
          username: 'JohnDoe',
          email: 'john@example.com',
          password: '********'
        }
      }
    });
  
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log('Updated user data:', result.data);
        // Save it to API or state
      }
    });
    await modal.present();
  }


}
