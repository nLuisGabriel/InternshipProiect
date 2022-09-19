import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import {UserControllerService} from "../../../api/services/user-controller.service";
import {UserAccount} from "../../../api/models/user-account";
import {UserServiceService} from "../../../services/user.service.service";
import {filter} from "rxjs";



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  successfulLogin!: boolean;
  loginForm!: FormGroup;
  username: String = '';
  password: String = '';
  constructor(private _formBuilder: FormBuilder, private http: HttpClient, private _router: Router, private _userControllerService: UserControllerService,
  private userService: UserServiceService
  ) {
    this.createLoginForm();
  }

  ngOnInit(): void {
    this.checkLogin();
  }
  checkLogin(){
    if(this.userService.isLoggedIn()){
      this._router.navigate(['user/info'])
    }

  }
  Login() {
    const formData = new FormData();
    let currentMail = this.loginForm.controls['mail'].value.toString();
    let currentPass = this.loginForm.controls['password'].value.toString();
    this.userService.login(currentMail,currentPass);
    this.userService.isLoggedIn$.subscribe((value:boolean)=>{
     this.successfulLogin = value;
    })

  }



  private createLoginForm() {
    this.loginForm = this._formBuilder.group({
      mail:[""],
      password:[""]
    })
  }


  goToRegisterPage() {
    this._router.navigate(['account/register'])
  }

}
