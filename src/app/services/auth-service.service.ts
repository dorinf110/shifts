import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthUser } from '../interfaces/auth-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  login=false; //keeps the state of user logging 
  txtNavBarLoginTxt="Login";
  userData:any;
  uid:string;
  logTime:number;
  errorCode:string="";
  errorMessage:string="";
  


  constructor(public Auth:AngularFireAuth, public router:Router) { 
    //set logged user in localstorage or delete it when no logged
    this.Auth.authState.subscribe(user=>{
      if(user){
        this.userData=user;
        localStorage.setItem('loggedUser',JSON.stringify(this.userData));
        // let test=JSON.stringify(user);
        // let test2 = JSON.parse(test);
        // console.log("UID este :" + test2.uid);
        // console.log("logTime este: "+ test2.lastLoginAt);
        // let item = JSON.parse(localStorage.getItem("loggedUser"));
        // this.uid= test2.uid;
        // console.log(item);
        // console.log("UID este :" + this.uid);
        // const loginTime=item.lastLoginAt;
        // this.logTime=+(test2.lastLoginAt);
        //  console.log("logTime este: "+ this.logTime);

        if(user){
          this.login=true;
          this.router.navigate(['home']);
          }
        }
      else {
        localStorage.setItem("loggedUser","");
        this.login=false;
        // this.router.navigate(['login']);
      }
    })
  }

  SignUp(email:string,password:string){
    // at signup we set the user to be already logged in
    this.login=true;
    return of(this.Auth.createUserWithEmailAndPassword(email,password));
  }

  SignIn(email:string,password:string){
    return of(this.Auth.signInWithEmailAndPassword(email,password));
  }

  SignOut(){
    return of(this.Auth.signOut());
  }

}
