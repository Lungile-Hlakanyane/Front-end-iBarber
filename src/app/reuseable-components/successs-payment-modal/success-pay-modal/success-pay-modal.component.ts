import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-success-pay-modal',
  templateUrl: './success-pay-modal.component.html',
  styleUrls: ['./success-pay-modal.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class SuccessPayModalComponent  implements OnInit {

  constructor(
    private modalController: ModalController,
    private router: Router
  ) { }

  ngOnInit() {}

  navigate(){
    this.router.navigate(['/bookings']);
    this.modalController.dismiss();
  }

}
