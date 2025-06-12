import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { ModalController,ToastController,LoadingController } from '@ionic/angular';
import { ReportUserService } from 'src/app/services/report-user-service/report-user.service';
import { ReportUserDTO } from 'src/app/models/ReportUserDTO';

@Component({
  selector: 'app-report-user-modal',
  templateUrl: './report-user-modal.component.html',
  styleUrls: ['./report-user-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ReportUserModalComponent  implements OnInit {
    @Input() userId!: number; 

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

  status: string = 'warned';
  selectedReason: string = '';
  reporterUserId!: number;

  constructor(
    private router: Router,
    private modalController: ModalController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private reportUserService: ReportUserService
  ) { }

  ngOnInit() {
    const userIdString = localStorage.getItem('userId');
    this.reporterUserId = userIdString ? parseInt(userIdString) : 0;
  }


  async submitReason() {
    const loading = await this.loadingController.create({
      message: 'Reporting...',
      spinner: 'circular'
    });
    await loading.present();

    const reportData: ReportUserDTO = {
      reportedUserId: this.userId,
      reporterUserId: this.reporterUserId,
      reason: this.selectedReason,
      status: this.status
    };

    console.log('Reporter ID:', this.reporterUserId);
    this.reportUserService.reportUser(reportData).subscribe({
      next: async () => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'You have successfully reported this user',
          duration: 2000,
          position: 'top',
          color: 'success'
        });
        await toast.present();
        this.modalController.dismiss({ reason: this.selectedReason });
      },
      error: async (err) => {
        await loading.dismiss();
        const toast = await this.toastController.create({
          message: 'Failed to report user. Try again.',
          duration: 2000,
          position: 'top',
          color: 'danger'
        });
        await toast.present();
      }
    });
  }


  dismissModal(){
    this.modalController.dismiss();
  }

}
