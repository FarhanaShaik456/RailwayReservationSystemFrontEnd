import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../Admin-Services/signup.service';
import Swal from 'sweetalert2';
import { AlertService } from '../Admin-Services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm: FormGroup;
  addUserErrorMessage: any;
  timerInterval: any; // Declare timerInterval variable
  // protected aFormGroup!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*()_+])[A-Za-z\d@#$!%^&*()_+]{8,}$/
          ),
        ],
      ],
      // role: ['', Validators.required],
      role: ['User', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      age: [
        null,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      country: ['', Validators.required],
    });
  }

//   ngOnInit() {
//     this.aFormGroup = this.formBuilder.group({
//       recaptcha: ['', Validators.required]
//     });
//   }
//  siteKey:string = "6LejtS4aAAAAAErne3MqabyOGoZ3D312WR_dMKRu";

  submitForm() {
    if (this.signupForm.valid) {
      // Submit the form data
      console.log(this.signupForm.value);
      this.signupService.signupUser(this.signupForm.value).subscribe(
        (response) => {
          console.log(response);
          // alert('Registration Successfull');
          Swal.fire({
            title: 'Welcome to Railway Reservation System',
            html: 'Please Check Email. Verify your Email',
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const popup = Swal.getPopup(); // Get the popup
              const timer = popup?.querySelector('b'); // Check if popup is not null
              if (timer) {
                this.timerInterval = setInterval(() => {
                  timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
              }
            },
            willClose: () => {
              clearInterval(this.timerInterval); // Use this.timerInterval to clear interval
            },
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer');
            }
          });
          this.router.navigate(['/verify'], {});
          sessionStorage.setItem('email', this.signupForm.get('email')?.value);
        },
        (error) => {
          console.log(error);
        }   
      );
    } else {
      // Handle validation errors
      console.log('Form contains validation errors.');
      alert('Please Provide Valid Data');
      window.location.reload();
    }
  }

  goBack() {
    window.location.reload(); // Reload the page
  }
}
  
