import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

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
    private fb:FormBuilder
  ) { 
    this.broadcastForm = this.fb.group({
      title: ['', Validators.required],
      message: ['', Validators.required],
      targetGroup: ['', Validators.required]
    });
  }

  ngOnInit() {}

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

  async sendBroadcast() {
    const announcement = {
      ...this.broadcastForm.value,
      date: new Date().toLocaleString()
    };
    this.broadcastHistory.unshift(announcement);
    this.broadcastForm.reset();

    const toast = await this.toastController.create({
      message: 'Announcement sent successfully!',
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    toast.present();
  }

}
