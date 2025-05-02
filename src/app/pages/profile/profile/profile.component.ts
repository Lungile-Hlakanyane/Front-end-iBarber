import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';

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
            console.log('Notifications toggled');
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
  


}
