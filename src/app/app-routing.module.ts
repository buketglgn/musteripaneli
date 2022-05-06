import { PasswordUpdateComponent } from './components/password-update/password-update.component';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {path:"",pathMatch:"full", component:UsersComponent},
  {path:"users", component:UsersComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"userupdate", component:UserUpdateComponent},
  {path:"users/update/:id", component:UserUpdateComponent},
  {path:"users/passwordupdate/:id", component:PasswordUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
