import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RnpService } from "./services/rnp-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private pdi: RnpService,private router: Router){}
  canActivate(){
    if(this.pdi.loggedIn()){
      return true
    }
    else{
      this.router.navigateByUrl('rnp/login')
      return false
    }
  }
  
}
