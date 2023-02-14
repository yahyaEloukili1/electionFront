import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RnpService } from '../../services/rnp-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
mode = 0
  constructor(private pdiService: RnpService,private router: Router) { }

  ngOnInit(): void {
    console.log(this.pdiService.loadToken(),"$$$$$$$$$$$")
    if(this.pdiService.jwtToken){
      this.router.navigateByUrl("situations/elections")
    }
  }
  onSubmit(f:NgForm){
      this.pdiService.login(f.value).subscribe(resp=>{
        let jwt = resp.headers.get('Authorization')
        this.pdiService.saveToken(jwt);
        this.router.navigateByUrl("elections/candidats")
        console.log(jwt)
        
      },err=>{
        this.mode = 1;
      })
  }
}
