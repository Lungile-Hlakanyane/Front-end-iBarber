import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterService } from 'src/app/services/user-service/register.service';

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
  barbers: any[] = [];
  
  selectBarber(barber: any) {
    console.log('Selected Barber:', barber);
  }

  constructor(
    private router: Router,
    private registerService:RegisterService
  ) { }

  ngOnInit() {
    this.registerService.getAllBarbers().subscribe((barbers) => {
      this.barbers = barbers;
      this.filteredBarbers = barbers;
    });
  }

  filterBarbers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredBarbers = this.barbers.filter(barber =>
      barber.username.toLowerCase().includes(term) ||
      barber.email.toLowerCase().includes(term)
    );
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }

  bookNow(barber: any) {
    this.router.navigate(['/book-appointment', barber.id]);
  }


}
