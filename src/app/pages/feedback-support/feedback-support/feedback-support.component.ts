import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-feedback-support',
  templateUrl: './feedback-support.component.html',
  styleUrls: ['./feedback-support.component.scss'],
  imports:[IonicModule, FormsModule, CommonModule],
  standalone: true,
})
export class FeedbackSupportComponent  implements OnInit {

  supportTickets = [
    {
      id: 1,
      username: 'john_doe',
      subject: 'App not loading',
      message: 'When I open the app, it gets stuck on the splash screen.',
      status: 'Pending'
    },
    {
      id: 2,
      username: 'alice_j',
      subject: 'Appointment cancellation issue',
      message: 'I was unable to cancel an appointment. Please assist.',
      status: 'Resolved'
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

  async markAsResolved(ticket: any) {
    ticket.status = 'Resolved';
    await this.presentToast(`Ticket from ${ticket.username} marked as resolved.`, 'success');
  }

  async viewTicket(ticket: any) {
    console.log('Viewing ticket:', ticket);
    await this.presentToast(`Viewing ticket: "${ticket.subject}"`, 'medium');
    // Optionally open a modal or navigate to detailed view
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
