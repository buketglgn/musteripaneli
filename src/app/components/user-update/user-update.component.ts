import { AuthService } from 'src/app/services/auth.service';
import { UserModel } from './../../models/userModel';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  user:UserModel;
  updateForm: FormGroup
  constructor(private userService: UserService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute,
    private formBuilder:FormBuilder,
    private authService:AuthService) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params["id"]){
        this.getUserById(params["id"])  
      }
     this.createupdateForm()
  })
  }
  update(){
    if(this.updateForm.valid){
     let userModel= Object.assign({},this.updateForm.value)    
     this.authService.Update(userModel).subscribe(response=>{
       this.toastrService.success("Güncelleme Başarılı.")
       window.location.reload();
     }  ,responseError=>{
       console.log(responseError.error)
     })
     
   }else{
     this.toastrService.error("Formunuz Eksik","Dikkat")
 } 
 }
  createupdateForm(){
    this.updateForm=this.formBuilder.group({
      id:["",Validators.required],
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      email:["",Validators.required],
     // passwordHash:["",Validators.required],
      //passwordSalt:["",Validators.required],
      role:["",Validators.required],
    })
  }
  getUserById(id:number){
    this.userService.getUsersById(id).subscribe(response=>{
      this.user=response.data;
      this.updateForm.controls['firstName'].setValue(this.user.firstName)
      this.updateForm.controls['lastName'].setValue(this.user.lastName)
      this.updateForm.controls['email'].setValue(this.user.email)
      this.updateForm.controls['id'].setValue(this.user.id)
      //this.updateForm.controls['passwordHash'].setValue(this.user.passwordHash)
      //this.updateForm.controls['passwordSalt'].setValue(this.user.passwordSalt)
      this.updateForm.controls['role'].setValue(this.user.role)
      })
  }
}
