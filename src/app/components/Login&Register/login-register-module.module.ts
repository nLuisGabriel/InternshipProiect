import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RegisterPageComponent} from "./register-page/register-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {interceptorProviders} from "../../interceptors/interceptors";
import {LoginRegisterRoutingModule} from "./login-register-routing.module";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {PasswordModule} from "primeng/password";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import {CardModule} from 'primeng/card';
import {UserServiceService} from "../../services/user.service.service";

@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    LoginRegisterRoutingModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    PasswordModule,
    CardModule,

  ],
  providers: [interceptorProviders]
})
export class LoginRegisterModuleModule { }
