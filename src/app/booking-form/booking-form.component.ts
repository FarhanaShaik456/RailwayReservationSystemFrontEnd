import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../Admin-Services/booking.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent implements OnInit {
  bookingForm!: FormGroup;
  pnr: any;
  timerInterval: any; // Declare timerInterval variable

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private router: Router
  ) {}

  trainNo = sessionStorage.getItem('trainNo');
  Fare: any = sessionStorage.getItem('fare');
  numberOfTickets: number = 1;

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      trainNo: [this.trainNo, [Validators.required]],
      Fare: [this.Fare],
      phnnumber: ['', [Validators.required, Validators.pattern('\\d{10}')]],
      email: ['', [Validators.required, Validators.email]],
      numberOfTickets: [
        1,
        [Validators.required, Validators.min(1), Validators.max(6)],
      ],
    });
  }

  submitForm() {
    if (this.bookingForm.valid) {
      // Form is valid, you can submit it here
      this.bookingService.bookTicket(this.bookingForm.value).subscribe(
        (response) => {
          console.log(response);
          sessionStorage.setItem('pnr', response);
        },
        (error) => {
          console.log(error);
        }
      );

      Swal.fire({
        title: 'Auto close alert!',
        html: "Your ticket has been successfully booked. Please proceed to make the payment to confirm your booking.",
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
      console.log(this.bookingForm.value);

      const totalCost = this.Fare * (this.bookingForm.get('numberOfTickets')?.value || 1);
      sessionStorage.setItem('totalCost', totalCost.toString());
      sessionStorage.setItem('email', this.bookingForm.get('email')?.value);

      this.router.navigate(['/payment'], {});
    } else {
      // Form contains validation errors
      alert('Please Enter the Details');
      console.log('Form contains validation errors.');
    }
  }

  goBack() {
    window.location.reload(); // Reload the page
  }
}
