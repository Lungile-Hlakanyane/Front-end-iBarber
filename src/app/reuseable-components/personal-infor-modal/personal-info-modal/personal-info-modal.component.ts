import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-personal-info-modal',
  templateUrl: './personal-info-modal.component.html',
  styleUrls: ['./personal-info-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class PersonalInfoModalComponent  implements OnInit {
  @Input() userData: any ={
    username: '',
    email: '',
    password: ''
  }

  constructor(
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {}

  async dismissModal() {  
    this.modalController.dismiss();
  }

  saveChanges() {
    // You could add validation or API call here
    this.modalController.dismiss(this.userData);
  }

}
