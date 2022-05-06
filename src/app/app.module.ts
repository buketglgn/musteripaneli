import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { JwtModule } from '@auth0/angular-jwt';
import { UserUpdateComponent } from './components/user-update/user-update.component';
import { PasswordUpdateComponent } from './components/password-update/password-update.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    LeftMenuComponent,
    FooterComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    UserUpdateComponent,
    PasswordUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
      }
    }),
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
       multi:true

   }
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
