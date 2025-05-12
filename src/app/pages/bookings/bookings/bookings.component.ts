import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BookingsComponent  implements OnInit {
  selectedSegment: string = 'upcoming';
bookingTab: any;
bookingHistory: any;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {}

  navigate(link:string){
    this.router.navigate([link]);
  }

  upcomingBookings = [
    {
      barberName: 'Jay The Barber',
      date: '12 Apr 2025',
      time: '14:00',
      location: 'Downtown Barbershop',
      status: 'confirmed'
    },
    {
      barberName: 'Mel Trims',
      date: '15 Apr 2025',
      time: '10:00',
      location: 'City Mall',
      status: 'pending'
    }
  ];

  pastBookings = [
    {
      barberName: 'Fade King',
      date: '02 Apr 2025',
      time: '12:00',
      location: 'East Side Barber',
      status: 'completed'
    },
    {
      barberName: 'Jay The Barber',
      date: '25 Mar 2025',
      time: '09:00',
      location: 'Downtown Barbershop',
      status: 'cancelled'
    }
  ];

  onSegmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
  }

  reschedule(booking: any) {
    console.log('Reschedule clicked for', booking);
  }

  cancel(booking: any) {
    console.log('Cancel clicked for', booking);
  }

  rebook(booking: any) {
    console.log('Rebook clicked for', booking);
  }

}
