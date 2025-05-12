import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-barber',
  templateUrl: './select-barber.component.html',
  styleUrls: ['./select-barber.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SelectBarberComponent  implements OnInit {
  searchTerm: string = '';
  filteredBarbers: any[] = [];

  barbers = [
    {
      id: 1,
      name: 'John Fadez',
      email: 'john@barber.com',
      profileImageUrl: 'assets/barbers/jay.jpg',
      contactNumber: '123-456-7890',
      location: 'Downtown Barbershop',
    },
    {
      id: 2,
      name: 'Sarah Clippers',
      email: 'sarah@barber.com',
      profileImageUrl: 'assets/barbers/king.jpg',
      contactNumber: '123-456-7890',
      location: 'Downtown Barbershop',
    },
    {
      id: 3,
      name: 'Mike Sharp',
      email: 'mike@barber.com',
      profileImageUrl: 'assets/barbers/mel.jpg',
      contactNumber: '123-456-7890',
      location: 'Downtown Barbershop',
    },
    {
      id: 4,
      name: 'Tumza the Barber',
      email: 'mike@barber.com',
      profileImageUrl: 'assets/barbers/mel.jpg',
      contactNumber: '123-456-7890',
      location: 'Downtown Barbershop',
    },
    {
      id: 5,
      name: 'AF Fades',
      email: 'mike@barber.com',
      profileImageUrl: 'assets/barbers/mel.jpg',
      contactNumber: '123-456-7890',
      location: 'Downtown Barbershop',
    },
  ];
  
  selectBarber(barber: any) {
    console.log('Selected Barber:', barber);
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.filteredBarbers = this.barbers;
  }

  filterBarbers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredBarbers = this.barbers.filter(barber =>
      barber.name.toLowerCase().includes(term) ||
      barber.email.toLowerCase().includes(term) ||
      barber.contactNumber.toLowerCase().includes(term) ||
      barber.location.toLowerCase().includes(term)
    );
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }


}
