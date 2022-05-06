import { UserService } from './../../services/user.service';
import { UserModel } from './../../models/userModel';

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
 public userId:number;
 users:UserModel[]=[]
  constructor(private userService: UserService,
    private toastrService:ToastrService,
    public authService:AuthService,
    ) { }

  
  ngOnInit(): void {
    this.getAllUsers() 
  }

  datayiAl(id:number){
    this.userId=id
   
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe(response=>{
      this.users=response.data;
      //console.log(response.data)


    })
  }
  IsTheRoleAnAdmin(){
    if(this.authService.rolee=='Admin'){
      return true
    }else{
      return false
    }
  }
    deleteUser(id:number){
      this.userService.deleteUserById(id).subscribe(response=>{
        this.toastrService.info("User Silindi.") 
       window.location.reload();
    },(responseError)=>{
      this.toastrService.error(responseError.error.errors);
      //console.log(responseError.error.errors)
      })
    }
   

update(id:number){
  console.log("update numara deneme")
  //console.log(id)
      this.authService.AdminRoleUpdate(id).subscribe(response=>{
        this.toastrService.info("Rolü Admin Olarak Değiştirildi..") 
       window.location.reload();
    },(responseError)=>{
      this.toastrService.error(responseError.error);
      console.log(responseError)
      })
      
   }

 

}
