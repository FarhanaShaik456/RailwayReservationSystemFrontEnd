import { Component, OnInit } from '@angular/core';
import { TrainService } from '../Admin-Services/train.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../Admin-Services/alert.service';

@Component({
  selector: 'app-train-list',
  templateUrl: './train-list.component.html',
  styleUrls: ['./train-list.component.css'],
})
export class TrainListComponent implements OnInit {
  formValue!: FormGroup;
  isLoggedIn: boolean = false;
  isRole: string | null = null;

  dataSource: any[] = [];

  constructor(
    private trainService: TrainService,
    private router: Router,
    private formbuilder: FormBuilder,
    private alert: AlertService,
  ) {}

  ngOnInit(): void {
    this.getTrainList();
    const loggedInValue = sessionStorage.getItem('loggedIn');
    this.isLoggedIn = loggedInValue === 'true';
    this.isRole = sessionStorage.getItem('role');
    this.formValue = this.formbuilder.group({
      trainNo: ['', [Validators.required, Validators.pattern('\\d{5}')]],
      trainName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
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
      ],
      fare: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
      seats: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
      time: ['', [Validators.required]],
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();
    this.dataSource = this.dataSource.filter((row) => {
      return (
        row.trainNo.toLowerCase().includes(filterValue) ||
        row.trainName.toLowerCase().includes(filterValue) ||
        row.trainFrom.toLowerCase().includes(filterValue) ||
        row.trainTo.toLowerCase().includes(filterValue)
      );
    });

    if (!filterValue || filterValue === '') {
      this.getTrainList();
    }
  }

  getTrainList() {
    this.trainService.getAllTrains().subscribe({
      next: (res) => {
        this.dataSource = res;
      },
      error: console.error,
    });
  }

  deleteTrain(trainNo: any) {
    console.log('Deleting train with trainNo: ', trainNo);

    this.trainService.deleteTrain(trainNo).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
    alert('Train deleted successfully ' + trainNo);
    this.getTrainList();
  }

  EditForm(data: any) {
    this.formValue.controls['trainNo'].setValue(data.trainNo);
    this.formValue.controls['trainName'].setValue(data.trainName);
    this.formValue.controls['trainFrom'].setValue(data.trainFrom);
    this.formValue.controls['trainTo'].setValue(data.trainTo);
    this.formValue.controls['fare'].setValue(data.fare);
    this.formValue.controls['seats'].setValue(data.seats);
    this.formValue.controls['time'].setValue(data.time);
    console.log(this.formValue.value.trainNo);
    sessionStorage.setItem('trainNo', this.formValue.value.trainNo);
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
      this.alert.openSnackBar("please login after that you can able to book a ticket","warning");
      this.router.navigate(['/login']);
    }
  }
  updateTrain() {
    console.log(this.formValue.value)
    this.trainService
      .updateTrain(this.formValue.value.trainNo, this.formValue.value)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.router.navigate(['/trainList']);
        },
      });
      this.getTrainList();
      window.location.reload();
  }
  onSubmit() {
    this.router.navigate(['/trainList']);
    this.getTrainList();
  }
}
