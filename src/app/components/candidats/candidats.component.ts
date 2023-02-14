import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RnpService } from 'src/app/services/rnp-service.service';

@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css']
})
export class CandidatsComponent implements OnInit {
  candidats
  communeName
  communes
  communeId: any;
  idchanged
  id
  private partyCache: { [key: number]: Observable<any> } = {};
  constructor(private rnpService:RnpService,private router:Router,private activatedRoute: ActivatedRoute,private http: HttpClient) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id']
    this.rnpService.getResourceByResourceId("candidats","Commune",5).subscribe(data=>{
      console.log(data['_embedded'])

     this.candidats = data['_embedded'].candidats
     console.log(this.candidats,'0ààààààààààààààààààààààààààààààààààààààààààà3333333333333333333333333333333333333333333333333')
     this.communeName = this.candidats[0].commune.designation
     this.communeId = this.candidats[0].commune.id
  
    })
 
    this.rnpService.getResourceAllByProjection("communes","projection=inlinePartie").subscribe(data=>{
      this.communes = data['_embedded'].communes
    
    })
    
  }
  getPartie(link,id){
   
    // this.rnpService.getOptional(link).subscribe(data=>{
    // console.log(data,"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    // })
  }
  onCommuneChange(event) {
    this.idchanged = event.target.value
     this.id = this.idchanged
     const selectedCommuneId = event.target.value;
  this.router.navigate(['elections/candidats']);

 
    
  }
  search(){
    this.rnpService.getResourceByResourceId("candidats","Commune",this.idchanged).subscribe(data=>{
      

      this.candidats = data['_embedded'].candidats
      this.communeName = this.candidats[0].commune.designation
      this.communeId = this.candidats[0].commune.id
  
      console.log(this.candidats,"111111111111111111")
      console.log(this.communeName,"2222222222222222222222é")
      console.log(this.communeId,"333333333333333333333333333333333333")
     })
   
    
  }
  onEditRNP(p:any){
 
       let url = p['_links'].self.href;
       this.router.navigateByUrl("elections/editCandidat/"+p.id)
  }
}
