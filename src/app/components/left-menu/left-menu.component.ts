import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {

  constructor(private toastrService:ToastrService,
    public authService:AuthService) { }

  ngOnInit(): void {
    if(this.isAuthenticated()){
      this.authService.userEmailFromToken();  
    } 
  }
  logout(){
    localStorage.clear();
    this.toastrService.info("Çıkış Yapıldı.")
    window.location.reload();
  }

  isAuthenticated(){
    if(this.authService.isAuthenticated()){
      return true
    }
    else{
      return false
    }
   }
}
