import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-view-portfolio-image',
  templateUrl: './view-portfolio-image.component.html',
  styleUrls: ['./view-portfolio-image.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule]
})
export class ViewPortfolioImageComponent  implements OnInit {
  @Input() imageSrc!: string;

  constructor(
    private router:Router,
    private modalController:ModalController
  ) { }

  ngOnInit() {}

  dismiss(){
    this.modalController.dismiss();
  }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

}
