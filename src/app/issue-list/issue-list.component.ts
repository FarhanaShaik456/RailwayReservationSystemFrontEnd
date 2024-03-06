import { Component, OnInit } from '@angular/core';
import { IssueService } from '../Admin-Services/issue.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { window } from 'rxjs';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css']
})
export class IssueListComponent implements OnInit {
  formValue!: FormGroup;
  isRole: string | null = null;
  data: any;
  dataSource: any[] = [];

constructor(
  private issueServie: IssueService,
  private formBuilder: FormBuilder,
  private router : Router,
){
}

ngOnInit(): void {
  this.isRole = sessionStorage.getItem('role');
  this.getIssueList();

  this.formValue = this.formBuilder.group({
    // issue: [''],
    status: [''], // Make sure 'status' is defined in your form group
    solution: [''],
  });
  
}

getIssueList(){
  if(this.isRole === 'Admin'){
  this.issueServie.getAllIssues().subscribe({
    next: (res) => {
      this.dataSource = res;
      console.log(this.dataSource+"******************************************")
    },
    error: console.error,
  });
}

else if(this.isRole === 'User'){
  this.issueServie.getUserissue().subscribe({
     next: (res) => {
        this.dataSource = res;
        console.log(res)
      },
      error: console.error,
  });
}
}

details(username: any){
  this.issueServie.getIssuesByUserName(username).subscribe({
    next: (res) => {
      this.data=res;
      // console.log("***************************************************")
      console.log(res)
    },
    error: console.error,
  });
} 
EditForm(issue: any) {
  console.log(issue)
  sessionStorage.setItem('issue',issue);
}

updateIssue(){
  console.log(this.formValue.value)
  this.issueServie
  .updateIssue(this.formValue.value)
  .subscribe({
    next: (res) => {
      console.log(res);
      this.router.navigate(['/issueList']);
    },
  });
  
  this.getIssueList();
}

}


