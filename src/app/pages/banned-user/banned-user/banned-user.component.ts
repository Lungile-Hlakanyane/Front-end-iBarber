import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { IonButton, IonContent, IonIcon, IonCard } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banned-user',
  templateUrl: './banned-user.component.html',
  styleUrls: ['./banned-user.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class BannedUserComponent  implements OnInit {

  constructor(
    private router:Router,
    private navController:NavController,
     private modalController:ModalController
  ) { }

  goBack(){
    this.navController.back();
  }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

  ngOnInit() {}

  openTerms(link:string){
    this.modalController.dismiss().then(()=>{
      this.router.navigateByUrl(link);
    })
  }

}
