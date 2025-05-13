import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fiance-report',
  templateUrl: './fiance-report.component.html',
  styleUrls: ['./fiance-report.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FianceReportComponent  implements OnInit {
  selectedPeriod: 'week' | 'month' | 'year' = 'week';
  reportData: any = null;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.filterReport();
  }

  navigate(link: string) {
    this.router.navigate([link]);
  }

  filterReport() {
    // Simulated report data
    const reports = {
      week: {
        totalRevenue: 12500,
        totalAppointments: 18,
        completedAppointments: 16
      },
      month: {
        totalRevenue: 52000,
        totalAppointments: 74,
        completedAppointments: 70
      },
      year: {
        totalRevenue: 645000,
        totalAppointments: 980,
        completedAppointments: 935
      }
    };

    this.reportData = reports[this.selectedPeriod];
  }

}
