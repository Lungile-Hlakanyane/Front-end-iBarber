import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular'; 
import { Client } from 'src/app/models/Client';
import { AlertController,ToastController,LoadingController,ModalController} from '@ionic/angular';
import { ReportUserModalComponent } from 'src/app/reuseable-components/report-user-modal/report-user-modal/report-user-modal.component';
import { ActivatedRoute } from '@angular/router';
import { RegisterService } from 'src/app/services/user-service/register.service';
import { User } from 'src/app/models/User';
import { ReportUserService } from 'src/app/services/report-user-service/report-user.service';
import { ReportUserDTO } from 'src/app/models/ReportUserDTO';

@Component({
  selector: 'app-view-client-profile',
  templateUrl: './view-client-profile.component.html',
  styleUrls: ['./view-client-profile.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ViewClientProfileComponent  implements OnInit {
  @Input() client!: Client;
  userId!: string | null;
  user: User | null = null;
  warnings: ReportUserDTO[] = [];

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController,
    private route:ActivatedRoute,
    private registerService: RegisterService,
    private navController:NavController,
    private reportUserService: ReportUserService
  ) { }

  goBack(){
    this.navController.back();
  }

  ngOnInit() {
    const storedId = localStorage.getItem('userId');
    if (storedId !== null) {
      const userId = Number(storedId);
      if (!isNaN(userId)) {
        this.loadWarnings(userId);
      }
    }
    this.userId = this.route.snapshot.queryParamMap.get('userId');
    if (this.userId) {
      this.registerService.getUserById(Number(this.userId)).subscribe({
        next: (data: User) => {
          this.user = data;
        },
        error: err => {
          console.error('Failed to fetch user by ID', err);
        }
      });
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
      cssClass: 'bottom-modal',
      componentProps: {
        userId: this.userId,
      }
    });
    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data?.reason) {
      console.log('Selected reason:', data.reason);
    }
  }

  async loadWarnings(userId: number) {
  this.reportUserService.getWarningsByUserId(userId).subscribe({
    next: (data) => {
      this.warnings = data;
    },
    error: (err) => console.error('Failed to load warnings:', err),
  });
}

}
