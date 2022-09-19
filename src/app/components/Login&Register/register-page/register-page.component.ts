import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {UserControllerService} from "../../../api/services/user-controller.service";
import {HttpClient} from "@angular/common/http";
import {UserAccount} from "../../../api/models/user-account";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {CustomValidators} from "./CustomValidators";
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  private _subscriptionList: Subscription[]=[];
  succesMessage="";
  errorMessage="";
  containSymbol = false;
  registerForm!: FormGroup;
  correctSize = false;
  containSmallLetter = false;
  containDigits = false;
  containCapitalLetter=false;
  constructor(private _formBuilder: FormBuilder, private _userService: UserControllerService,private http: HttpClient,private _router: Router) {
    this.createRegisterForm();
  }

  ngOnInit(): void {
    this._subscriptionList.push(

      this.registerForm.controls["password"].valueChanges.subscribe((pass:string) =>{
        this.containCapitalLetter=(/[A-Z]/.test(pass)===true) ? true:false;
        this.containDigits = (/\d/.test(pass)===true) ? true : false;
        this.containSmallLetter = (/[a-z]/.test(pass)===true) ? true:false;
        this.correctSize = (pass.length>8 && pass.length<20) ? true : false;
        this.containSymbol = (/[|\\/~^:,;?!&%$@*+]/.test(pass)===true) ? true : false;

    })

    );

  }

  private createRegisterForm() {
    this.registerForm = this._formBuilder.group({
      mail:[null,[Validators.required, Validators.email]],
      password:[null,[Validators.required,Validators.pattern(/[|\\/~^:,;?!&%$@*+]/) ,Validators.pattern('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$')]],
      username:[null,[Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      password2:[null, [Validators.required]],

    },{validators: this.passMatcher});
  }

  Register() {
    const registerUser : UserAccount= {

      username : this.registerForm.controls["username"].value,
      password : this.registerForm.controls["password"].value,
      email : this.registerForm.controls["mail"].value
    }
    this._userService.registerAccountUsingPOST(registerUser).subscribe(()=>{
        this.succesMessage="You have new account! Go to login page!";
    },
      error => {
      console.log(error.error)
      this.errorMessage=error.error;
      });
    this.succesMessage="";
    this.errorMessage="";
  }

  ngOnDestroy(): void {
    this._subscriptionList.forEach(t=>{t.unsubscribe()});
  }

  toLoginPage() {
    this._router.navigate(['./account/login'])
  }

  passMatcher(c: AbstractControl): { [key: string]: boolean } | null {
    const pass = c.get('password');
    const pass2 = c.get('password2');

    if (pass!.pristine || pass2!.pristine) {
      return null;
    }

    if (pass!.value === pass2!.value) {
      return null;
    }
    return { 'match': true };
  }
}
