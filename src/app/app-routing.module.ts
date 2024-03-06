import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { TrainFormComponent } from './train-form/train-form.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { IssueFormUserComponent } from './issue-form-user/issue-form-user.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import { TrainListComponent } from './train-list/train-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import { SearchTrainsComponent } from './search-trains/search-trains.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { PaymentComponent } from './payment/payment.component';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PaymentlistComponent } from './paymentlist/paymentlist.component';
import { CancelComponent } from './cancel/cancel.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SetPasswordComponent } from './set-password/set-password.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';

const routes: Routes = [
  {path:'login', component: SigninComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: '**', redirectTo: '/login', pathMatch: 'full' },
  {path:'register', component: SignupComponent},
  {path:'addtrain', component: TrainFormComponent},
  {path:'bookingTicket', component: BookingFormComponent},
  {path:'issueUserForm', component: IssueFormUserComponent},
  {path:'navbar', component: NavbarAdminComponent}, 
  {path:'trainList', component: TrainListComponent},
  {path:'userList', component:UserListComponent},
  {path:'bookingList', component:BookingListComponent},
  {path:'searching', component:SearchTrainsComponent},
  {path: 'issueList', component:IssueListComponent},
  {path: 'adminLogin', component: AdminLoginComponent},
  {path: 'userLogin', component: UserLoginComponent},
  {path: 'payment', component: PaymentComponent},
  {path: 'home', component:HomeComponent},
  // { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:'profile',component:MyProfileComponent},
  {path: 'paymentList' , component:PaymentlistComponent},
  {path: 'cancel' , component:CancelComponent},
  {path : 'verify' , component:VerifyEmailComponent},
  {path : 'set-password' , component:SetPasswordComponent},
  {path : 'forgotpassword' , component:ForgotpasswordComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
