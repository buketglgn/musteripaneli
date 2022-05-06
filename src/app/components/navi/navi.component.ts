import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  constructor(public authService:AuthService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
  }

  isAuthentication(){
    if(this.authService.isAuthenticated()){
      return true
    }else{
      return false
    }

  }
  logout(){
    localStorage.clear();
    this.toastrService.info("Çıkış Yapıldı.")
    window.location.reload();
  }

}
