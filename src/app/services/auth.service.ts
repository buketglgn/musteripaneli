import { RegisterModel } from './../models/registerModl';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/loginModel';
import { TokenModel } from '../models/tokenModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: any;
  public email:string;

  public name:string;

  public userId:number;

  public rolee:string;

  apiUrl="https://localhost:44310/api/auth/"
  constructor(private httpClient:HttpClient,
    private jwtHelper: JwtHelperService) { }

    login(loginModel:LoginModel):Observable<TokenModel>{
      return this.httpClient.post<TokenModel>(this.apiUrl+"login",loginModel)
    }

    Register(registerModel:RegisterModel):Observable<TokenModel>{
      return this.httpClient.post<TokenModel>(this.apiUrl+"register",registerModel)
    }

    Update(updateModel:RegisterModel):Observable<TokenModel>{
      return this.httpClient.post<TokenModel>(this.apiUrl+"userupdatewithoutpassword",updateModel)
    }

    PasswordUpdate(passwordUpdateModel:RegisterModel):Observable<TokenModel>{
      return this.httpClient.post<TokenModel>(this.apiUrl+"passwordupdate",passwordUpdateModel)
    }

    

    AdminRoleUpdate(userId:number):Observable<ResponseModel>{
      let newPath=this.apiUrl+"adminroleupdate?id="+userId

      return this.httpClient.post<ResponseModel>(newPath,userId);
    }
    isAuthenticated(){
      if(localStorage.getItem("token")){
        return true;
      }
      else{
        return false;
      }
    }

    userEmailFromToken(){
      this.token = localStorage.getItem("token");
      let decodedToken = this.jwtHelper.decodeToken(this.token);
   
       let email=decodedToken['email'];
      this.email=email.split('@')[0]

      this.rolee=decodedToken['typ'];
      

      let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
      this.name = name.split(' ')[0];

      this.userId =parseInt(decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']);
    }
}
