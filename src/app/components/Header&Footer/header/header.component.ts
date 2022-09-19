import { Component, OnInit } from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {MenubarModule} from "primeng/menubar";
import {UserServiceService} from "../../../services/user.service.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items! : MenuItem[];

  constructor(private router: Router,   private http: HttpClient, private _userService : UserServiceService) { }

  ngOnInit(): void {
    this.navigationBarConfiguration();
  }

  navigationBarConfiguration(){

    this.items = [
      // {label: "New Entry", icon: PrimeIcons.SAVE, routerLink:'/account/login'},
      {label: "New Entry", icon: PrimeIcons.SAVE, routerLink:'user/new-entry'},
      {label: "Product", icon: PrimeIcons.TICKET,routerLink:"user/products" },
      {label: "Stock", icon: PrimeIcons.DATABASE, routerLink:"user/stock"},
      {label: "Account Details", icon: PrimeIcons.USERS, command:(event)=>{if(localStorage.getItem("email")!=""){this.router.navigate(['user/info'])}} },
      {label: "Registration page", icon: PrimeIcons.SIGN_IN, routerLink:'account/register'},
      {label:"Logout", icon:PrimeIcons.SIGN_OUT,
        command: (event) =>{this.logout();}
      }
    ]


  }

  private logout() {
    this._userService.logout();
  }
}



