import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterPageComponent} from "./register-page/register-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {RouterModule, Routes} from '@angular/router';
import {UserServiceService} from "../../services/user.service.service";

const login_register : Routes = [
  {path: '', component:RegisterPageComponent},
  {path:'login', component: LoginPageComponent},
  {path:'register', component: RegisterPageComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(login_register)
  ],
  exports:[RouterModule]
})
export class LoginRegisterRoutingModule { }
