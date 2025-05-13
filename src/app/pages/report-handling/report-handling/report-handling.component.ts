import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-report-handling',
  templateUrl: './report-handling.component.html',
  styleUrls: ['./report-handling.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class ReportHandlingComponent  implements OnInit {

  reports = [
    {
      id: 1,
      reportedUser: 'John Doe',
      reportedBy: 'Jane Smith',
      reason: 'Harassment',
      description: 'Used inappropriate language in chat.'
    },
    {
      id: 2,
      reportedUser: 'Alice Johnson',
      reportedBy: 'Bob Brown',
      reason: 'Spam',
      description: 'Repeatedly sent spam messages.'
    },
    {
      id: 3,
      reportedUser: 'Pierre Lusaka',
      reportedBy: 'Bob Brown',
      reason: 'Spam',
      description: 'Repeatedly sent spam messages.'
    }

  ];

  constructor(
    private router:Router,
    private toastController:ToastController
  ) { }

  ngOnInit() {}

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

  async warnUser(report: any) {
    console.log('Warned:', report.reportedUser);
    await this.presentToast(`${report.reportedUser} has been warned.`, 'warning');
  }

  async banUser(report: any) {
    console.log('Banned:', report.reportedUser);
    await this.presentToast(`${report.reportedUser} has been banned.`, 'danger');
  }

  async dismissReport(report: any) {
    console.log('Dismissed report:', report.id);
    await this.presentToast(`Report against ${report.reportedUser} dismissed.`, 'medium');
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
