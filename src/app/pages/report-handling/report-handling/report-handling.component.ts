import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ReportUserDTO } from 'src/app/models/ReportUserDTO';
import { ReportUserService } from 'src/app/services/report-user-service/report-user.service';
import { RegisterService } from 'src/app/services/user-service/register.service';

@Component({
  selector: 'app-report-handling',
  templateUrl: './report-handling.component.html',
  styleUrls: ['./report-handling.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class ReportHandlingComponent  implements OnInit {

  reports: ReportUserDTO[] = [];

  constructor(
    private router:Router,
    private toastController:ToastController,
    private reportUserService: ReportUserService,
     private registerService:RegisterService
  ) { }

  async ngOnInit() {
    this.loadReports();
 }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

 loadReports() {
  this.reportUserService.getAllReports().subscribe({
    next: async (data: ReportUserDTO[]) => {
      const updatedReports = await Promise.all(
        data.map(async report => {
          try {
            const [reportedUser, reporterUser] = await Promise.all([
              this.registerService.getUserById(report.reportedUserId).toPromise(),
              this.registerService.getUserById(report.reporterUserId).toPromise()
            ]);
            report.reportedUserName = reportedUser?.username || 'Unknown';
            report.reporterUserName = reporterUser?.username || 'Unknown';
          } catch (error) {
            console.error(`Failed to fetch user(s) for report ID ${report.id}`, error);
            report.reportedUserName = 'Unknown';
            report.reporterUserName = 'Unknown';
          }
          return report;
        })
      );
      this.reports = updatedReports;
    },
    error: err => console.error('Failed to load reports', err)
  });
}


async warnUser(report: ReportUserDTO) {
  console.log('Warned:', report.reportedUserName);
  await this.presentToast(`${report.reportedUserName} has been warned.`, 'warning');
}

async banUser(report: ReportUserDTO) {
  this.reportUserService.banUser(report.id).subscribe({
    next: async () => {
      await this.presentToast('You have successfully banned this user','success');
      this.loadReports();
    },
    error: async err => {
      console.error('Failed to ban user:', err);
      await this.presentToast(`Failed to ban ${report.reportedUserName}`, 'danger');
    }
  });
}

 async dismissReport(report: ReportUserDTO) {
  this.reportUserService.dismissReport(report.id).subscribe({
    next: async () => {
      await this.presentToast(`Report against ${report.reportedUserName} dismissed & user permanently deleted.`, 'medium');
      this.loadReports(); // Refresh list
    },
    error: async err => {
      console.error('Failed to dismiss report:', err);
      await this.presentToast(`Failed to dismiss report for ${report.reportedUserName}`, 'medium');
    }
  });
}

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,
      position: 'top'
    });
    toast.present();
  }

}
