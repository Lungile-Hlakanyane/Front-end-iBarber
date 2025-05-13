import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { User } from 'src/app/models/User';
import { AlertController,ToastController, LoadingController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule]
})
export class ManageUsersComponent  implements OnInit {

  searchTerm: string = '';

  users: User[] = [
    { name: 'Lungile Hlakanyane', phone: '+27 65 635 2578', email: 'lungilehlakas@gmail.com', role: 'Client' },
    { name: 'Jay Barber', phone: '+27 71 123 4567', email: 'jaybarber@gmail.com', role: 'Barber' },
    { name: 'Mel Admin', phone: '+27 82 987 6543', email: 'admin@ibarber.com', role: 'Admin' },
    { name: 'Thabo Mokoena', phone: '+27 78 456 7890', email: 'thabo.mokoena@example.com', role: 'Client' },
    { name: 'Zinhle Dlamini', phone: '+27 66 222 3344', email: 'zinhled@example.com', role: 'Barber' },
    { name: 'Nomvula Sithole', phone: '+27 72 111 2233', email: 'nomvula.sithole@example.com', role: 'Client' },
    { name: 'Kabelo Khumalo', phone: '+27 60 555 6666', email: 'kabelo.k@example.com', role: 'Admin' },
    { name: 'Nandi Cele', phone: '+27 79 888 9900', email: 'nandi.cele@example.com', role: 'Barber' },
    { name: 'Simphiwe Nxumalo', phone: '+27 64 777 8888', email: 'simphiwe.nx@example.com', role: 'Client' },
    { name: 'Tshepo Radebe', phone: '+27 83 123 9876', email: 'tshepo.radebe@example.com', role: 'Admin' },
  ];
  

  filteredUsers: User[] = [];

  constructor(
    private alertController:AlertController,
    private toastController:ToastController,
    private actionSheetController:ActionSheetController,
    private loadingController:LoadingController,
    private router:Router
  ){

  }

  navigate(link:string){
    this.router.navigateByUrl(link);
  }

  ngOnInit() {
    this.filteredUsers = this.users;
  }

  filterUsers() {
    const term = this.searchTerm.toLowerCase();
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.phone.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }

  async presentActionSheet(user: User) {
    const actionSheet = await this.actionSheetController.create({
      header: 'User Actions',
      buttons: [
        {
          text: 'View',
          icon: 'eye-outline',
          handler: () => {
            this.router.navigateByUrl('/admin-view-user');
          }
        },
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash-outline',
          handler: () => {
            this.presentDeleteAlert(user);
          }
        },
        {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel'
        }
      ]
    });
    await actionSheet.present();
  }

  async presentDeleteAlert(user: User) {
    const alert = await this.alertController.create({
      header: 'Confirm Delete',
      message: 'Are you sure you want to delete this user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Yes',
          handler: () => {
            this.deleteUser(user);
          }
        }
      ]
    });
    await alert.present();
  }

  async deleteUser(user: User) {
    const loading = await this.loadingController.create({
      message: 'Deleting user...',
      duration: 2000
    });
    await loading.present();

    setTimeout(async () => {
      this.users = this.users.filter(u => u !== user);
      this.filterUsers();
      await loading.dismiss();
      this.showToast('You have successfully deleted this user...');
    }, 2000);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'top',
      color: 'success'
    });
    await toast.present();
  }

}
