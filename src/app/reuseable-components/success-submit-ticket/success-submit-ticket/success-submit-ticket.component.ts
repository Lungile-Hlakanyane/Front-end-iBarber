import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-success-submit-ticket',
  templateUrl: './success-submit-ticket.component.html',
  styleUrls: ['./success-submit-ticket.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class SuccessSubmitTicketComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

   navigate(){
    this.router.navigate(['/home']);
    this.modalController.dismiss();
  }

}
