import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from 'src/app/models/userModel';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {
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
     this.authService.PasswordUpdate(userModel).subscribe(response=>{
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
      password:["",Validators.required],
    })
  }

  getUserById(id:number){
    this.userService.getUsersById(id).subscribe(response=>{
      this.user=response.data;
      
      this.updateForm.controls['id'].setValue(this.user.id)
      
      })
  }
}
