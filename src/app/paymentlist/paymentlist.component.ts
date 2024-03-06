import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { PaymentService } from '../Admin-Services/payment.service';

@Component({
  selector: 'app-paymentlist',
  templateUrl: './paymentlist.component.html',
  styleUrls: ['./paymentlist.component.css']
})
export class PaymentlistComponent   implements OnInit{

  isLoggedIn:boolean=false;
  isRole: string | null = null;
  dataSource:any[]=[];

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getAllPayments();
    const loggedInValue = sessionStorage.getItem('loggedIn');
    this.isLoggedIn = loggedInValue === 'true';
    // throw new Error('Method not implemented.');
    this.getAllPayments();
  }

  getAllPayments()
  {
  
    this.paymentService.getPaymentList().subscribe({
      next:(res)=>{
        this.dataSource=res;
        console.log(res)
      },
      error:console.error,
    });
  
  }

  goBack() {
    this.location.back();
  }
  
}
