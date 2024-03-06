import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {
  constructor(private router: Router) {}

  UserOptions = [
    {
      url: '/assets/UserTL.jpg',
      title: 'Trains',
      description: 'View and manage the list of available trains.',
      route: '/trainList',
    },
    {
      url: '/assets/UserBL.jpg',
      title: 'My Bookings',
      description: 'No more waiting in long queues. With our railway reservation system, you can Book seat',
      route: '/bookingList',
    },
    {
      url: '/assets/UserC.webp',
      title: 'Rise Issue',
      description: 'Need help or have questions? ',
      route: '/issueUserForm',
    },
    {
      url: '/assets/UserCL.jpg',
      title: 'My Issue List',
      description: 'Our friendly support team is here.  Experience the future of railway booking with us.',
      route: '/issueList',
    },
  ];
  

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}


