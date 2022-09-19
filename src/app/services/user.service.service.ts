import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of, Subject, switchMap} from "rxjs";
import {UserAccount} from "../api/models/user-account";
import {Router} from "@angular/router";
import {HttpClient, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn:'root'
})
export class UserServiceService implements OnInit{

  public currentUser$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public isLoggedIn$: Subject<boolean> = new Subject<boolean>();
  httpError!:boolean;

  constructor(private router: Router, private http: HttpClient) {

  }

  ngOnInit(): void {
  }
  public logout() {
    this.http.post('http://localhost:8080/logout', {withCredentials: true}).subscribe(() => {
      localStorage.removeItem('email');
      this.router.navigate(['/account/login']);
    })
  }
  setToken(token: string): void{
    localStorage.setItem("email",token);
  }
  getToken(): string | null{
    return localStorage.getItem('email')
  }
  isLoggedIn(){
    return this.getToken() != null;
  }
  login(email:string, pass:string){
    let logged!: boolean;
    const formData = new FormData();
    formData.append("username",email);
    formData.append("password",pass)
    this.http.post('http://localhost:8080/login', formData, { responseType: 'text', observe: 'response', withCredentials: true })
      .subscribe({
      next:(response:HttpResponse<string>) =>{
        console.log("Login Success!");
        logged = response.ok
        this.setToken(email);
        this.currentUser$.next(email);
        this.isLoggedIn$.next(true);
        this.router.navigate(['/user/info'])
      },
        error:(err: HttpResponse<string>)=>{
          logged = err.ok
          this.isLoggedIn$.next(false);
        }
    })

  }



}
