import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserServiceService} from "../../../services/user.service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserAccount} from "../../../api/models/user-account";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {HttpHeaders, HttpParams} from "@angular/common/http";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit, OnDestroy{
  email = localStorage.getItem("email")!;
  errorMessage='';
  private _subscriptionList: Subscription[]=[];
  creationDate? :string;
  userFormDatabase: UserAccount = {email:"",creationDate:"",password:"",username:""};
  editPasswordClicked=false; editEmailClicked=false; editUsernameClicker=false; deleteUserClicked=false;
  EmailForm!: FormGroup;
  UserForm!: FormGroup;
  PasswordForm!: FormGroup;


  constructor(private userControl: UserControllerService,private _formBuilder: FormBuilder,private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
    this.redirectToLogin();
    this.info();
    this.createEmailForm();
    this.createUsernameForm();
    this.createPasswordForm();
  }
  private redirectToLogin() {
    if(this.email==""){
      this.router.navigate(['account/login'])
    }
  }


  private info() {
    this.userControl.getUserAccountByEmilUsingGET(this.email).subscribe( (user:UserAccount)=>{
      this.userFormDatabase=user;
      this.creationDate = this.userFormDatabase.creationDate;

      }
    );
  }
  private createEmailForm() {
    this.EmailForm = this._formBuilder.group({
      email:['', [Validators.required,Validators.email]],
      emailPass:['',[Validators.required,Validators.pattern(/[|\\/~^:,;?!&%$@*+]/),Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'),Validators.minLength(5), Validators.maxLength(50) ]]
    })
  }
  private createUsernameForm() {
    this.UserForm = this._formBuilder.group({
      username: ['',[Validators.required, Validators.minLength(5)]],
      pass:['',[Validators.required,Validators.pattern(/[|\\/~^:,;?!&%$@*+]/),Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'),Validators.minLength(5), Validators.maxLength(50)]]
    })
  }

  private createPasswordForm() {
    this.PasswordForm = this._formBuilder.group({
      newpass:['',[Validators.required,Validators.pattern(/[|\\/~^:,;?!&%$@*+]/),Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'),Validators.minLength(5), Validators.maxLength(50)]],
      oldpass:['',[Validators.required,Validators.pattern(/[|\\/~^:,;?!&%$@*+]/),Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'),Validators.minLength(5), Validators.maxLength(50)]]
    })
  }

  hiddeUsenameForm() {
    this.editUsernameClicker=false;
  }

  hiddeEmailForm() {
    this.editEmailClicked=false;
  }

  hiddePasswordForm() {
    this.editPasswordClicked=false;
  }
  hiddeDeleteQ() {
    this.deleteUserClicked=false;
  }


  editUserPassword() {
    this.editPasswordClicked=true;
    this.editEmailClicked=false;
    this.editUsernameClicker=false;
    this.deleteUserClicked=false
  }


  editUserEmail() {
    this.editPasswordClicked=false;
    this.editEmailClicked=true;
    this.editUsernameClicker=false;
    this.deleteUserClicked=false;
    }


  editUserUsername() {
    this.editPasswordClicked=false;
    this.editEmailClicked=false;
    this.editUsernameClicker=true;
    this.deleteUserClicked=false;
  }

  deleteUser() {
    this.editPasswordClicked=false;
    this.editEmailClicked=false;
    this.editUsernameClicker=false;
    this.deleteUserClicked=true;
  }




  submitEmailChanges() {
    let newEmail = this.EmailForm.get('email')?.value;
    let pass= this.EmailForm.get('emailPass')?.value;
    const details = {
      verifyPassword: pass,
      newMail: newEmail,
      currentMail: this.userFormDatabase.email
    }
    this._subscriptionList.push(
      this.userControl.updateUserEmailUsingPUT(details).subscribe(()=>{
          console.log("Schimbarea email-ului a avut loc cu succes!")
          this.userService.logout();
        },
        (error)=>{this.errorMessage=error.error})
    )

  }

  submitUsernameChanges() {
    let newUsername = this.UserForm.get("username")?.value;
    let pass= this.UserForm.get("pass")?.value;
    const deatails = {
      verifyPassword: pass,
      newUsername: newUsername,
      currentMail: this.userFormDatabase.email
    }
    this._subscriptionList.push(
      this.userControl.updateUserUsernameUsingPUT(deatails).subscribe(()=>{
          this.userService.logout();
          console.log("Schimbare username-ului a fost un succes")
        },
        (error)=>{ this.errorMessage=error.error})
    );

  }

  submitPasswordChanges() {
    let newpass = this.PasswordForm.get("newpass")?.value
    let oldpass = this.PasswordForm.get("oldpass")?.value
    let email = this.userFormDatabase.email;
    const details = {
      verifyPassword: oldpass,
      newPassword: newpass,
      mail: email
    }
    this._subscriptionList.push(

      this.userControl.updateUserPasswordUsingPUT(details).subscribe(()=>{
          this.userService.logout();
          console.log("Schimbarea parolei a avut loc!")
        },
        (error)=>{this.errorMessage=error.error})
    );

  }

  deleteUserAccount() {
    let index = this.userFormDatabase.id!;
    this._subscriptionList.push(
      this.userControl.deleteUserUsingDELETE(index).subscribe(()=>{
        this.userService.logout();
        console.log("Contul a fost sters cu succes!")
      },(error)=>{this.errorMessage=error.error})
    )
  }

  ngOnDestroy(): void {
    this._subscriptionList.forEach((t)=>t.unsubscribe());
  }



}
