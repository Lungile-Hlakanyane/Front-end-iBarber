import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SideMenuComponent } from 'src/app/reuseable-components/side-menu/side-menu.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FeedComponent  implements OnInit {

  constructor(
    private router: Router,
    private modalController: ModalController,
  ) { }

  
  posts = [
    {
      barberName: 'Jay The Barber',
      profileImage: 'assets/barbers/jay.jpg',
      imageUrl: 'assets/cuts/fade1.jpg',
      caption: 'Fresh fade drop 🔥 Book me via iBarber app!',
      timestamp: '2 hours ago'
    },
    {
      barberName: 'Mel Trims',
      profileImage: 'assets/barbers/mel.jpg',
      imageUrl: 'assets/cuts/taper.jpg',
      caption: 'Tapered look for the weekend 💈',
      timestamp: 'Yesterday'
    },
    {
      barberName: 'Fade King',
      profileImage: 'assets/barbers/king.jpg',
      imageUrl: 'assets/cuts/skinfade.jpg',
      caption: 'Skin fade perfection! DM to lock a slot!',
      timestamp: 'Just now'
    }
  ];

  ngOnInit() {}

  navigate(link:string){
    this.router.navigate([link]); 
  }

  async openMenuModal() {
      const modal = await this.modalController.create({
        component: SideMenuComponent,
      });
      await modal.present();
    }
  

}
