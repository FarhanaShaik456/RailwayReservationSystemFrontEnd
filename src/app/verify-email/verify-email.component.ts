import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VerificationService } from '../Admin-Services/verification.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AlertService } from '../Admin-Services/alert.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent {
  otp: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(6),
    Validators.pattern('^[0-9]*$')
  ]);
  otpValue: string = '';
  aFormGroup!: FormGroup;
  constructor(
    private verificationService: VerificationService,
    private router: Router,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    ) {}

    ngOnInit() {
      this.aFormGroup = this.formBuilder.group({
        otp: this.otp,
        recaptcha: ['', Validators.required],
      });
    }
    siteKey: string = '6LcFyTIpAAAAAIMbghXCcKqKKbQ1Q3c3Efi9ZI5k';

  verifyOTP() {
    if (this.otp.valid) {
      this.otpValue = this.otp.value;
      console.log('Entered OTP:', this.otpValue);
      const userEmail = sessionStorage.getItem('email');
      if (userEmail) {
        this.verificationService.verifyAccount(userEmail, this.otpValue).subscribe(
          response => {
            console.log('Verification response:', response);
            Swal.fire({
              position: "center",
              icon: "success",
              title: "OTP verified you can login",
              showConfirmButton: false,
              timer: 2000
            });
            this.router.navigate(["/login"])
          }, error => {
            console.error('Verification error:', error);
          }
        );
      } else {
        console.error('User email is null');
        
      }
    } else {
      this.otp.markAllAsTouched();
    }
  }

  resendOTP() {
    console.log('Resending OTP...');

    const userEmail = sessionStorage.getItem('email');
    if (userEmail) {
      this.verificationService.resendOtp(userEmail).subscribe(
        response => {
          console.log('Please check your email:', response);
          this.alertService.openSnackBar("Email sent... please verify account within 1 minute","OK");
        }, error => {
          console.error('Mail Not Send:', error);
        }
      );
    } else {
      console.error('User email is null');
      
    }
  }
}
