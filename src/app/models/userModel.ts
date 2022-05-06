import { Byte } from "@angular/compiler/src/util";

export interface UserModel{
    id:number;
    firstName:string;
    lastName:string;
    email:string;
    role:string;
    passwordHash? :Byte
    passwordSalt? :Byte;
}