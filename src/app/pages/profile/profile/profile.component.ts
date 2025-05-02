import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProfileComponent  implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {}

  navigate(link:string){
    this.router.navigate([link]); 
  }

}
