import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController, LoadingController, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SupportTicketService } from 'src/app/services/support-ticket-service/support-ticket.service';
import { SuccessSubmitTicketComponent } from 'src/app/reuseable-components/success-submit-ticket/success-submit-ticket/success-submit-ticket.component';
import { RegisterService } from 'src/app/services/user-service/register.service';

@Component({
  selector: 'app-support-ticket',
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule]
})
export class SupportTicketComponent  implements OnInit {
  ticketForm!: FormGroup;
  username: string = '';

  constructor(
    private fb: FormBuilder,
    private supportTicketService: SupportTicketService,
    private toastController: ToastController,
    private router: Router,
    private modalController:ModalController,
    private loadingController:LoadingController,
    private registerService:RegisterService
  ) { }

  async ngOnInit() {
    this.getUsername();
    this.ticketForm = this.fb.group({
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

async submitTicket() {
  if (this.ticketForm.invalid) return;

  const loading = await this.loadingController.create({
    message: 'Submitting ticket...',
    spinner: 'crescent',
    backdropDismiss: false
  });

  await loading.present();

  const ticketData = {
    username: this.username,
    subject: this.ticketForm.value.subject,
    message: this.ticketForm.value.message,
    status: 'Pending'
  };

  this.supportTicketService.createTicket(ticketData).subscribe({
    next: async () => {
      await loading.dismiss();

      const toast = await this.toastController.create({
        message: 'Ticket submitted successfully!',
        duration: 1500,
        color: 'success',
        position: 'top'
      });
      await toast.present();

  
      const modal = await this.modalController.create({
        component: SuccessSubmitTicketComponent,
        cssClass: 'submit-ticket-modal', 
        backdropDismiss: true
      });

      await modal.present();

      const { role } = await modal.onDidDismiss();
      if (role !== 'cancel') {
        this.router.navigate(['/home']);
      }
    },
    error: async () => {
      await loading.dismiss();
      const toast = await this.toastController.create({
        message: 'Something went wrong!',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      await toast.present();
    }
  });
}

back() {
  this.router.navigate(['/profile']);
}

async getUsername(){
   const storedUserId = localStorage.getItem('userId');
  if (storedUserId) {
    const userId = parseInt(storedUserId, 10);
    this.registerService.getUserById(userId).subscribe({
      next: (user) => {
        this.username = user.username;
        console.log('Fetched username:', this.username);
      },
      error: (err) => {
        console.error('Failed to fetch user details:', err);
      }
    });
  }
}

}
