import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth-service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit{

  constructor(
    private router: Router,
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.initializeApp();
    // this.initializeServiceApp();
  }

   initializeApp() {
    const userEmail = localStorage.getItem('userEmail');
    const userRole = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');
    if (userEmail && userRole && userId) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

   initializeServiceApp() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
