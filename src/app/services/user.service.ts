import { HttpClient } from '@angular/common/http';
import { UserModel } from './../models/userModel';
import { Injectable } from '@angular/core';

import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { ResponseModel } from '../models/responseModel';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="https://localhost:44310/api/users"
  constructor(private httpClient:HttpClient) { }

    getAllUsers():Observable<ListResponseModel<UserModel>>{

      let newPath=this.apiUrl+"/getall";
      return this.httpClient.get<ListResponseModel<UserModel>>(newPath);
    }

    getUsersById(userId:number):Observable<SingleResponseModel<UserModel>>{

      let newPath=this.apiUrl+"/getbyid?id="+userId

      return this.httpClient.get<SingleResponseModel<UserModel>>(newPath);

    }

    deleteUserById(userId:number):Observable<ResponseModel>{
      let newPath=this.apiUrl+"/deletebyid?id="+userId

      return this.httpClient.post<ResponseModel>(newPath,userId);
    }

    
  }

