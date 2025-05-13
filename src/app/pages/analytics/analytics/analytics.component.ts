import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class AnalyticsComponent  implements OnInit {

  activeUsers = 124;
  totalBookings = 345;
  totalRevenue = 11250.00;

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    this.initRevenueChart();
  }

  initRevenueChart() {
    new Chart('revenueChart', {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Revenue (R)',
          data: [2000, 2500, 3000, 1800, 1950],
          backgroundColor: '#007f5f'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#333' }
          },
          x: {
            ticks: { color: '#333' }
          }
        }
      }
    });
  }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }
}
