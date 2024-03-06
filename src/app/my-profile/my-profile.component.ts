import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../Admin-Services/profile.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  updateForm!: FormGroup;
  username = sessionStorage.getItem('username');
  datasource: any[] = [];
  data: any;

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      username: [this.username],
      role: ['User'],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0), Validators.max(100)]],
      country: ['', Validators.required]
    });
    this.newmethod();
  }

  submitForm() {
    if (this.updateForm.valid) {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`
      }).then((result) => {
        if (result.isConfirmed) {
          this.profileService.updateProfile(this.updateForm.value).subscribe({
            next: (res) => {
              console.log('Data Updated Successfully', res);
              Swal.fire('Saved!', '', 'success').then(() => {
                // Perform navigation or any other actions after successful update
                // For example, navigate to another page
                this.location.back();
              });
            },
            error: (error) => {
              console.error('Error while updating:', error);
              Swal.fire('Error!', 'Failed to update data', 'error');
            }
          });
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info');
        }
      });
    } else {
      console.log('Form contains validation errors.');
      alert('Please Provide Valid Data');
    }
  }

  goBack() {
    this.location.back();
  }

  newmethod() {
    this.profileService.showuserdetails(this.username).subscribe({
      next: (res: any) => {
        this.data = res;
        console.log(res);
        this.updateForm.patchValue({
          email: res.email,
          age: res.age,
          gender: res.gender,
          country: res.country
        });
      }
    });
  }
}
