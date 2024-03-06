import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssueService } from '../Admin-Services/issue.service';
import { AlertService } from '../Admin-Services/alert.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-issue-form-user',
  templateUrl: './issue-form-user.component.html',
  styleUrls: ['./issue-form-user.component.css'],
})
export class IssueFormUserComponent implements OnInit {
  issueForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private issueService: IssueService,
    private alertService: AlertService,
    private router: Router,
    ) {}

  ngOnInit() {
    this.issueForm = this.formBuilder.group({
      issue: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(250)]],
      status: ['New'], // Auto-populated with "New"
    });
  }

  submitForm() {
    if (this.issueForm.valid) {
      // Submit the form data
      console.log(this.issueForm.value);
      this.issueService.addissue(this.issueForm.value).subscribe({
        next:(val:any)=>{
          console.log(val)
        }
      })
      console.log(this.issueForm.value)
      // alert("Data Added Successfully")
      this.alertService.openSnackBar("Issue rised successfully")
      this.router.navigate(['/userLogin'])
    } else {
      // Handle validation errors
      this.alertService.openSnackBar("Form contain validation errors.");
      console.log('Form contains validation errors.');
    }
  }

  goBack() {
    window.location.reload(); // Reload the page
  }
}
