import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RnpService } from 'src/app/services/rnp-service.service';

@Component({
  selector: 'app-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.css']
})
export class ElectionsComponent implements OnInit {
  elections
  communeName
  communes
  communeId: any;
  idchanged
  id
  winner
  sommeVoix: number
  sommefeuilles: any;
  nmbMosa: any;
  somenmbMosa: any;
  somPourcentage
  someInscrits: number;
  constructor(private rnpService:RnpService,private router:Router,private activatedRoute: ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']
    this.rnpService.getResourceByResourceId("elections","Commune",5).subscribe(data=>{
      console.log(data['_embedded'])

     this.elections = data['_embedded'].elections
     console.log(this.elections,'0ààààààààààààààààààààààààààààààààààààààààààà3333333333333333333333333333333333333333333333333')
     this.communeName = this.elections[0].commune.designation
     this.communeId = this.elections[0].commune.id
     this.sommeVoix = 0
     for (var i = 0; i < this.elections.length; i++) {
      if (this.elections[i].voix || this.elections[i].voix === 0) {
        this.sommeVoix += this.elections[i].voix;
    
      }
    }
    this.sommefeuilles = 0
    for (var i = 0; i < this.elections.length; i++) {
      if (this.elections[i].voix || this.elections[i].voix === 0) {
        this.sommefeuilles += this.elections[i].feuillesSupprimes;
       
      }
    }
    this.somenmbMosa = 0
    for (var i = 0; i < this.elections.length; i++) {
      if (this.elections[i].voix || this.elections[i].voix === 0) {
        this.somenmbMosa += this.elections[i].nmbMosa;
        
      }
    }
    this.someInscrits = 0
    for (var i = 0; i < this.elections.length; i++) {
      if (this.elections[i].voix || this.elections[i].voix === 0) {
        this.someInscrits += this.elections[i].nmbInscrits;
      
      }
    }
    this.somPourcentage = ((this.somenmbMosa /this.someInscrits)*100).toFixed(2);
  
    })
  }
  onEditRNP(p:any){
 
    let url = p['_links'].self.href;
    this.router.navigateByUrl("elections/editElection/"+btoa(url))
}

}
