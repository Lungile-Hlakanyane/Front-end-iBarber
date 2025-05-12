import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login/login.component';
import { RegisterComponent } from './pages/auth/register/register/register.component';
import { OtpComponent } from './pages/auth/otp/otp/otp.component';
import { FeedComponent } from './pages/feed/feed/feed.component';
import { BottomNavigationComponent } from './reuseable-components/bottom-navigation/bottom-navigation.component';
import { ProfileComponent } from './pages/profile/profile/profile.component';
import { ChatComponent } from './pages/chat/chat/chat.component';
import { ChatListComponent } from './pages/chat-list/chat-list/chat-list.component';
import { CreatePostComponent } from './pages/post/create-post/create-post.component';
import { BookingsComponent } from './pages/bookings/bookings/bookings.component';
import { SelectBarberComponent } from './pages/select-barber/select-barber/select-barber.component';
import { ViewBarberProfileComponent } from './pages/view-barber-profile/view-barber-profile/view-barber-profile.component';
import { BookAppointmentComponent } from './pages/book-appointment/book-appointment/book-appointment.component';
import { PaymentMethodsComponent } from './pages/payment-methods/payment-methods/payment-methods.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'otp', component:OtpComponent },
  { path: 'feed',component:FeedComponent},
  { path: 'chat', component:ChatComponent},
  { path: 'select-barber', component: SelectBarberComponent},
  { path: 'view-barber-profile', component:ViewBarberProfileComponent},
  { path: 'book-appointment', component:BookAppointmentComponent},
  { path: 'payment-methods', component:PaymentMethodsComponent},
  {
    path: '',
    component: BottomNavigationComponent,
    children: [
      { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
      { path: 'feed', component:FeedComponent},
      { path: 'profile', component:ProfileComponent},
      { path: 'chat-list', component: ChatListComponent},
      { path: 'create-post', component: CreatePostComponent},
      { path: 'bookings', component: BookingsComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
