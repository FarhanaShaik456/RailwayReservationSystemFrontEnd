
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VerificationService } from '../Admin-Services/verification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css'],
})
export class SetPasswordComponent {
  password: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{8,}$/
    ),
  ]);
  aFormGroup!: FormGroup;
  setPassword: string = '';
  email: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: VerificationService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.email = params['email']; // Extracting email from the URL
    });

    this.aFormGroup = this.formBuilder.group({
      password: this.password,
      recaptcha: ['', Validators.required],
    });
  }

  siteKey: string = '6LcFyTIpAAAAAIMbghXCcKqKKbQ1Q3c3Efi9ZI5k';

  setpassword() {
    if (this.password.valid) {
      this.setPassword = this.password.value;

      // Call the backend service to set password
      this.service.setPassword(this.email, this.setPassword)
        .subscribe(response => {
          // Handle response if needed
          console.log(this.email)
          console.log(response);

            Swal.fire({
              title: "New Password set successfully login with new password",
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

        }, error => {
          // Handle error if needed
          console.error(error);
        });

    } else {
      // Mark all fields as touched to trigger validation messages
      this.aFormGroup.markAllAsTouched();
    }
  }
}
