import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-success-subscribe',
  templateUrl: './success-subscribe.component.html',
  styleUrls: ['./success-subscribe.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class SuccessSubscribeComponent  implements OnInit {

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
