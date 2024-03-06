import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainService } from '../Admin-Services/train.service';
import { Router } from '@angular/router';
import { AlertService } from '../Admin-Services/alert.service';
@Component({
  selector: 'app-search-trains',
  templateUrl: './search-trains.component.html',
  styleUrls: ['./search-trains.component.css']
})
export class SearchTrainsComponent implements OnInit {

  search!: FormGroup;
  noTrainsFoundMessage: string = ''; // Initialize it with an empty string
  isLoggedIn: boolean = false;
  isRole: string | null = null;
 
  datasource: any[]=[];
  constructor(private trainService:TrainService,
          private router:Router,
          private formbuilder:FormBuilder,
          private alertServie: AlertService,
    ) { }
 
    ngOnInit():void{
      const loggedInValue = sessionStorage.getItem('loggedIn');
      this.isLoggedIn = loggedInValue === 'true';
      this.isRole = sessionStorage.getItem('role');
      this.search=this.formbuilder.group({
        trainFrom: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ],
        trainTo: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(30),
          ],
        ]
      });}

      searchTrains()
      {
        this.trainService.findByLocation(this.search.value.trainFrom,this.search.value.trainTo).subscribe
          ({
            next:(val:any)=>{
              this.datasource=val;
              if(this.datasource.length===0)
              {
                  this.noTrainsFoundMessage="No trains were found";
              }
            },
            
            error:console.error,
          });
      }

      redirectToBookingOrLogin(data: any) {
        if (this.isLoggedIn) {
          // If logged in, check their role
          sessionStorage.setItem('trainNo', data.trainNo);
          sessionStorage.setItem('fare', data.fare);
          console.log(data.trainNo)
          if (this.isRole === 'User') {
            // Redirect regular user to booking page
            this.router.navigate(['/bookingTicket']);
           
          }
        } else {
          // If not logged in, redirect to login page
          this.alertServie.openSnackBar("please login after that you can able to book a ticket", "warning")
          this.router.navigate(['/login']);
        }
      }
}
