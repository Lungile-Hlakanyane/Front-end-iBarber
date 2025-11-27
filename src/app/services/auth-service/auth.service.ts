import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = null;

  constructor() { 
    const storedUser = localStorage.getItem('userEmail');
    if (storedUser) {
      this.user = {
        email: localStorage.getItem('userEmail'),
        role: localStorage.getItem('userRole'),
        id: localStorage.getItem('userId')
      };
    }
  }

  isLoggedIn() {
    return this.user !== null;
  }

  logout() {
    localStorage.clear();
    this.user = null;
  }

}
