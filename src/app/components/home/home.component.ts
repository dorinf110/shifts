import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Router } from '@angular/router';
import { NotifierService } from 'src/app/services/notifier.service';
import { UserServiceFirestoreService } from 'src/app/services/user-service-firestore.service';
import { User } from 'src/app/interfaces/user';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private router:Router, private authService:AuthServiceService, private notifier:NotifierService, 
    private userFireStoreServ:UserServiceFirestoreService, private datePipe:DatePipe){}
  loggedUserEmail:string;
  loggedUserName:string;
  users:any[];
  userData:{};
  userLog:any[];
  foundUsr:User;


  logout(){
    this.authService.SignOut();
    let item = localStorage.getItem("loggedUser");
    if(item){
      localStorage.setItem("loggedUser","");
      this.notifier.showNotification("You are logged out!", "OK", "warning",'bottom');
      this.router.navigate(['register']);
    }
   }
   checkEmail(){
    // console.log(this.users);
    //   console.log(this.users[2]);
   
      this.userLog=this.users.find((data)=>{
      data.email===this.loggedUserEmail}
      )
      console.log(this.userLog['username']);
      // console.log(this.userLog[0]['email']);
      console.log(this.users[0].email);
      // for ()
  }
  ngOnInit(): void {
    // check if the user is logged in no more than an hour ago. Otherwise logout user and navigate to login
    let item = localStorage.getItem("loggedUser");
    if(item){
      this.loggedUserEmail = JSON.parse(item).email;
      let loginTime = JSON.parse(item).lastLoginAt;
      // console.log("LastLogin At is: "+ loginTime );
      let curTime = (new Date()).getTime();
      if (curTime - loginTime > 3600000){
        this.notifier.showNotification("Login expired! Please, login again!","OK","warning","top");
        this.authService.SignOut();
        localStorage.setItem("loggedUser","");
        this.router.navigate(['login']);
      } 
    }
    else{
      // this.notifier.showNotification("User not logged in. PLease login!","OK","error","top");      
      this.router.navigate(['login']);
    }
    
    // reading all users from firestore database
    this.userFireStoreServ.getUsers().subscribe(data=>{
      this.users=[];
    data.map(a=>{
        this.users.push(a.payload.doc.data());
     })
    //  retrieve user name to show on Welcome message 
      this.foundUsr = this.users.find(x=>{
      return x.email === this.loggedUserEmail;
     })
     })
}}