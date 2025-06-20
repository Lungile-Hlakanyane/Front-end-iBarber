import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { SupportTicketDTO } from 'src/app/models/SupportTicketDTO';
import { SupportTicketService } from 'src/app/services/support-ticket-service/support-ticket.service';

@Component({
  selector: 'app-feedback-support',
  templateUrl: './feedback-support.component.html',
  styleUrls: ['./feedback-support.component.scss'],
  imports:[IonicModule, FormsModule, CommonModule],
  standalone: true,
})
export class FeedbackSupportComponent  implements OnInit {

 supportTickets: SupportTicketDTO[] = [];

  constructor(
    private router:Router,
    private toastController:ToastController,
    private supportTicketService:SupportTicketService
  ) { }

  ngOnInit() {
    this.loadTickets();
  }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

async markAsResolved(ticket: SupportTicketDTO) {
  this.supportTicketService.updateTicketStatus(ticket.id, 'Resolved').subscribe({
    next: async () => {
      ticket.status = 'Resolved';
      await this.presentToast(`Ticket from ${ticket.username} marked as resolved.`, 'success');
    },
    error: async () => {
      await this.presentToast('Failed to update ticket.', 'danger');
    }
  });
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

   loadTickets() {
    this.supportTicketService.getAllTickets().subscribe({
      next: (tickets) => {
        this.supportTickets = tickets;
      },
      error: (err) => {
        console.error('Failed to fetch support tickets:', err);
      }
    });
  }



}
