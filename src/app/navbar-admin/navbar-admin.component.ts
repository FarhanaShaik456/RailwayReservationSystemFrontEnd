import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SigninService } from '../Admin-Services/signin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  isLoggedIn: boolean = false;
  isRole: string | null = null; // Initialize isRole as a string or null
  formValue!: FormGroup;

  username = sessionStorage.getItem('username');
  
  constructor(
    private router: Router,
    private formbuilder: FormBuilder,
    private signinService : SigninService,
    ) { }

  ngOnInit(): void {
    const loggedInValue = sessionStorage.getItem('loggedIn');
    this.isLoggedIn = loggedInValue === 'true';
    this.isRole = sessionStorage.getItem('role');

    this.formValue = this.formbuilder.group({
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{8,}$/)
        ]
      ],
    })

  }



  
  handleLogout(): void {
    // Handle the logout action here, e.g., clear sessionStorage and navigate to the login page

    Swal.fire({
      title: "Are you sure? you want to Logout",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('role');
        sessionStorage.clear();
        this.isLoggedIn = false; // Update the logged-in status
        Swal.fire({
          title: "Logout Sucessfull !",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            // Reload the window after the SweetAlert is closed
            this.router.navigate(['/login']);
          }
        });
      }
    });
  }

  
  updatepassword(){
    console.log(this.formValue.value)
    this.signinService
    .updatePassword(this.formValue.value)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
    });
    window.location.reload();
  }
  
}