import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VerificationService } from '../Admin-Services/verification.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {

  email: FormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  aFormGroup!: FormGroup;
  sendEmail: string ='';

  constructor(
    private formBuilder: FormBuilder,
    private verificationService: VerificationService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      email: this.email,
      recaptcha: ['', Validators.required],
    });
  }
  siteKey: string = '6LcFyTIpAAAAAIMbghXCcKqKKbQ1Q3c3Efi9ZI5k';

  forgotpassword() {
    if (this.email.valid) {
      this.sendEmail = this.email.value;
      this.verificationService.forgotPassword(this.sendEmail).subscribe(
        (response) => {
          // Handle response if needed
          console.log('Please check your email to set new password to your account');
          this.showCustomAlert(); // Call the function to show the alert
        },
        (error) => {
          // Handle error if needed
          console.error('Error sending forgot password request:', error);
        }
      );
    } else {
      // Mark all fields as touched to trigger validation messages
      this.aFormGroup.markAllAsTouched();
    }
  }

  // Define the function outside of the forgotpassword() method
  showCustomAlert() {
    Swal.fire({
      title: "Link send to your Registered Email Id",
      showConfirmButton: false, // Remove the OK button
      timer: 40000, // Set timer to 40 seconds
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    }).then(() => {
      // Route to login page after the timer is up
      this.router.navigate(['/login']);
    });
  }
}
