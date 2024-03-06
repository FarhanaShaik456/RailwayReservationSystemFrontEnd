import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainService } from '../Admin-Services/train.service';
import { AlertService } from '../Admin-Services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-train-form',
  templateUrl: './train-form.component.html',
  styleUrls: ['./train-form.component.css']
})
export class TrainFormComponent {
  trainForm: FormGroup;

  constructor(private fb: FormBuilder, private trainservice:TrainService, private alertService: AlertService, private router: Router) {
    this.trainForm = this.fb.group({
      trainNo: ['', [Validators.required, Validators.pattern('\\d{5}')]],
      trainName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      trainFrom: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      trainTo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      fare: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
      seats: [0, [Validators.required, Validators.min(0), Validators.max(50)]],
      time: ['', [Validators.required]]
    });
  }

  
  submitForm() {
    if (this.trainForm.valid) {
      // Submit the form data
      console.log(this.trainForm.value);
      this.trainservice.addTrain(this.trainForm.value).subscribe({
        next:(val:any)=>{
          console.log(val)
          // alert("Data Added Successfully")
          // window.location.reload();
        } 
      })
      console.log(this.trainForm.value)
      this.alertService.openSnackBar("Train Details Addedd successfully")
      // window.location.reload();
      this.router.navigate(['/adminLogin']);
    } else {
      // Handle validation errors
      // alert('Please Enter Valid Data')
      this.alertService.openSnackBar("Please Enter valid Details")
      console.log('Form contains validation errors.');
    }
  }

  goBack() {
     // Reload the page
  }
  reload(){
    window.location.reload();
  }
}

