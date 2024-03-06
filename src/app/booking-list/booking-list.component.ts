import { Component, OnInit } from '@angular/core';
import { BookingService } from '../Admin-Services/booking.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit{
  isRole: string | null = null;

  dataSource: any[] = [];

  data: any;

  constructor(
    private bookingService: BookingService,
    private router: Router
    ){}

  ngOnInit(): void {
    this.getBookingList();
    this.isRole = sessionStorage.getItem('role');
    this.getBookingList();
  }

  getBookingList() {
    if(this.isRole === 'Admin'){
    this.bookingService.getAllBookings().subscribe({
      next: (res) => {
        this.dataSource = res;
        // console.log("***************************************************")
        console.log(res)
      },
      error: console.error,
    });
  }
  else if(this.isRole === 'User'){
    this.bookingService.viewByUserName().subscribe({
      next: (res) => {
        this.dataSource = res;
        // console.log("***************************************************")
        console.log(res)
      },
      error: console.error,
    });
  }
  }

  
  cancelTicket(pnr: any) {
    console.log('Deleting TIcket with PNR: ', pnr);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.bookingService.cancelTicket(pnr).subscribe({
          next: (res) => {
            console.log(res);
          },
        });
        Swal.fire({
          title: "Deleted!",
          text: "Ticket deleted successfull.",
          icon: "success"
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            // Reload the window after the SweetAlert is closed
            this.getBookingList();
          }
        });
      }
    });
    
  } 

  details(pnr: any){
    this.bookingService.getDetails(pnr).subscribe({
      next: (res) => {
        this.data=res;
        // console.log("***************************************************")
        console.log(res)
      },
      error: console.error,
    });
  }

  async downloadPDF() {
    const modalContent = document.getElementById('exampleModal');
    if (modalContent) {
      const canvas = await html2canvas(modalContent);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add custom text before booking details
      pdf.text("Welcome to Railway Reservation System", 10, 10);
      // pdf.text("Your ticket has been confirmed successfully.", 10, 20);
      // pdf.text("Thank you for choosing our service.", 10, 30);
      pdf.text("Here are your booking details:", 10, 40);

      // Add booking details
      pdf.addImage(imgData, 'PNG', 0, 50, imgWidth, imgHeight);
      pdf.save('BookingDetails.pdf');
    }
}


  payment(Cost: any){
    sessionStorage.setItem('cost',Cost);
    this.router.navigate(['/payment']);
  }

}
