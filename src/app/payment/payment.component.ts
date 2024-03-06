import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../Admin-Services/booking.service';
declare var Razorpay: any;

@Component({
  selector: 'app-root',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent {

  cost: string | null = sessionStorage.getItem('totalCost');
  username: string | null = sessionStorage.getItem('username');
  email: string | null = sessionStorage.getItem('email');
  pnr: string | null = sessionStorage.getItem('pnr');

  constructor(private router: Router, private bookingService: BookingService) {}

  payNow() {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      email: this.email,
      amount: (Number(this.cost) || 0) * 100,
      name: this.username,
      key: 'rzp_test_hNKb0Mfexo1czt',
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      prefill: {
        name: this.username,
        email: this.email,
      },
      theme: {
        color: '#006400'
      },
      modal: {
        ondismiss: () => {
          console.log('Payment dismissed');
          this.pnr = sessionStorage.getItem('pnr');
          this.cancelTicket(this.pnr); // Call cancelTicket method passing pnr
        }
      }
    };

    const successCallback = (paymentid: any) => {
      console.log('Success Callback:', paymentid);
      alert('Payment is done');
      this.router.navigate(['/bookingList']);
    };
    this.router.navigate(['/bookingList']);

    const failureCallback = (e: any) => {
      console.log('Failure Callback:', e);
      alert('Try it again');
    };

    Razorpay.open(RozarpayOptions, successCallback, failureCallback);
  }

  cancelTicket(pnr: any) {
    console.log('Cancelling the payment...');
    // Implement the cancellation logic here
    // This function is called when the payment button is not clicked within 10 seconds

    this.bookingService.cancelTicket(pnr).subscribe({
            next: (res) => {
              console.log(res);
              console.log("Error is Here")
              alert('Payment cancellation initiated for ' + pnr);
              this.router.navigate(['/cancel']);
            },
          });
    this.router.navigate(['/cancel']);
  }
}


































































// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { BookingService } from '../Admin-Services/booking.service';
// declare var Razorpay: any;

// @Component({
//   selector: 'app-root',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.css'],
// })
// export class PaymentComponent {
//   cost = sessionStorage.getItem('totalCost');
//   username = sessionStorage.getItem('username');
//   email = sessionStorage.getItem('email');
//   pnr = sessionStorage.getItem('pnr');
//   paymentTimeout: any; // Store the timeout reference

//   constructor(
//     private router: Router,
//     private bookingService: BookingService,
//   ) {}

//   payNow() {
//     const RozarpayOptions = {
//       description: 'Sample Razorpay demo',
//       currency: 'INR',
//       email: this.email,
//       amount: (Number(this.cost) || 0) * 100,
//       name: this.username,
//       key: 'rzp_test_RI4gAGm8AHZVOH',
//       image: 'https://i.imgur.com/FApqk3D.jpeg',
//       prefill: {
//         name: this.username,
//         email: this.email,
//       },
//       theme: {
//         color: '#006400',
//       },
//       modal: {
//         ondismiss: () => {
//           console.log('dismissed');
//           // Perform the cancellation logic when the payment button is not clicked
//           this.cancelTicket(this.pnr);
//         },
//       },
//     };

//     const successCallback = (paymentid: any) => {
//       console.log('Success Callback:', paymentid);
//       alert('Payment is done');
//       this.router.navigate(['/bookingList']);
//     };

//     this.router.navigate(['/bookingList']);

//     const failureCallback = (e: any) => {
//       console.log('Failure Callback:', e);
//       alert('Try it again');
//     };

//     // Set a timeout for 10 seconds (10,000 milliseconds)
//     this.paymentTimeout = setTimeout(() => {
//       alert('Payment not clicked within 10 seconds');
//       // Perform your cancelTicket operation here
//       this.cancelTicket(this.pnr); // You need to provide the 'pnr' as a parameter
//     }, 10000);

//     Razorpay.open(RozarpayOptions, successCallback, failureCallback);
//   }

//   cancelTicket(pnr: any) {
//     console.log('Cancelling the payment...');
//     // Implement the cancellation logic here
//     // This function is called when the payment button is not clicked within 10 seconds

//     this.bookingService.cancelTicket(pnr).subscribe({
//       next: (res) => {
//         console.log(res);
//         alert('Payment cancellation initiated for ' + pnr);
//       },
//     });
//     this.router.navigate(['/bookingTicket']);
//   }

//   // This function will be called when the payment button is clicked
//   buttonClicked() {
//     clearTimeout(this.paymentTimeout); // Cancel the timeout
//     this.payNow(); // Trigger the payment process
//   }
// }
