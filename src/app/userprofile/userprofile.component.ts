import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit { 
  userObj:any; 
  
  constructor(private us:UserService,private router:Router ) { } 
  ngOnInit(): void { 
    //get username from local storage 
    let username=localStorage.getItem("username")
    this.userObj=this.us.getUser(username).subscribe( 
      res=>{ 
        if(res["message"]=="success"){
        this.userObj=res["user"]
        }
        else{
          alert(res["message"])
          //navigate to login page
          this.router.navigateByUrl("/login")
        }
      }, 
      err=>{ 
        alert("Something went wrong") 
        console.log(err) 
      } ) 
    } 
    onSubmit(){
      
      this.router.navigateByUrl("/userdashboard/updateprofile",this.userObj)
    }
  }