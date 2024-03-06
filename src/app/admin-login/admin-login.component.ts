import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  constructor(private router: Router) {}

  AdminOptions = [
    {
      url: '/assets/AdminTL.jpg',
      title: 'Trains',
      description: 'View and manage the list of available trains.',
      route: '/trainList',
    },
    {
      url: '/assets/AdminUL.jpg',
      title: 'Users',
      description: 'Explore and manage the list of registered users.',
      route: '/userList',
    },
    {
      url: '/assets/AdminCL.jpg',
      title: 'Issues',
      description: 'Track and address reported issues and complaints.',
      route: '/issueList',
    },
    {
      url: '/assets/AdminBL.jpg',
      title: 'Bookings',
      description: 'Access and manage the list of train bookings.',
      route: '/bookingList',
    },
  ];
  

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}


