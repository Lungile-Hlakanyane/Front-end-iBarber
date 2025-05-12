import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bottom-navigation',
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BottomNavigationComponent  implements OnInit {

  role: string = '';

  constructor(private router:Router) { }

  ngOnInit() {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      this.role = storedRole;
    }
  }
  

}
