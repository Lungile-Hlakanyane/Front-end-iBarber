import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { Announcement } from 'src/app/models/Announcement';
import { BroadcastServiceService } from 'src/app/services/broadcast-announcement-service/broadcast-service.service';

@Component({
  selector: 'app-broadcast-announcements',
  templateUrl: './broadcast-announcements.component.html',
  styleUrls: ['./broadcast-announcements.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class BroadcastAnnouncementsComponent  implements OnInit {
  broadcastForm!: FormGroup;
  broadcastHistory: any[] = [];

  constructor(
    private router:Router,
    private toastController:ToastController,
    private fb:FormBuilder,
    private announcementService: BroadcastServiceService,
    private loadingController: LoadingController  
  ) { 
    this.broadcastForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      targetGroup: ['', Validators.required]
    });
  }

  async ngOnInit() {
    await this.loadBroadcastHistory();
  }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

 async sendBroadcast() {
  if (this.broadcastForm.invalid) return;

  const loading = await this.loadingController.create({
    message: 'Sending Announcement...',
    spinner: 'circular'
  });
  await loading.present();

  const announcement: Announcement = {
    ...this.broadcastForm.value,
    date: new Date().toLocaleString()
  };

  this.announcementService.sendAnnouncement(announcement).subscribe({
    next: async (res) => {
      this.broadcastHistory.unshift(res);
      this.broadcastForm.reset();
      await loading.dismiss();

      const toast = await this.toastController.create({
        message: 'Announcement sent successfully!',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();
    },
    error: async (err) => {
      console.error('Broadcast failed', err);
      await loading.dismiss();

      const toast = await this.toastController.create({
        message: 'Failed to send announcement',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
    }
  });
}

  loadBroadcastHistory() {
    this.announcementService.getAllAnnouncements().subscribe({
      next: (data) => {
        this.broadcastHistory = data.reverse(); 
      },
      error: (err) => {
        console.error('Failed to load announcements', err);
      }
    });
  }

  

}
