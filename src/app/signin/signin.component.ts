import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SigninService } from '../Admin-Services/signin.service';
import { AlertService } from '../Admin-Services/alert.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinUser: FormGroup;
  showPassword: boolean = false;

  registrationSuccess: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private signinFrom: SigninService,
    private router: Router,
    private alertService: AlertService,
    
  ) {
    this.signinUser = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  submitForm() {
    if (this.signinUser.valid) {
      // Submit the form data
      this.signinFrom.signinUser(this.signinUser.value).subscribe({
        next: (val: any) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login Successfully",
            showConfirmButton: false,
            timer: 2000
          });
          sessionStorage.setItem('loggedIn', 'true');
          sessionStorage.setItem('role', val.roles[0]); // Access the roles array
          sessionStorage.setItem('token', val.accessToken);
          sessionStorage.setItem('username',val.username);

          if(sessionStorage.getItem('role') === 'Admin'){
          this.router.navigate(['/adminLogin']);
          }
          else if(sessionStorage.getItem('role') === 'User'){
            this.router.navigate(['/userLogin']);
          }
        },
        error: (error) => {
          console.error('*****************************************************  Error:', error.message);
          Swal.fire({
            icon: "error",
            title: "Oops...Login Failed",
            text: " Please Enter Valid Username and Password",
          }).then((result) => {
            if (result.isConfirmed || result.isDismissed) {
              // Reload the window after the SweetAlert is closed
              window.location.reload();
            }
          });
        },
      });
    } else {
      this.alertService.openSnackBar('Please Enter Username and Password','warning');
      console.log('Form contains validation errors.');
    }
  }

  goBack() {
    window.location.reload(); // Reload the page
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
