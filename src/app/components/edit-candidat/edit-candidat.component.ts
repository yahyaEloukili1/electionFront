import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RnpService } from 'src/app/services/rnp-service.service';

@Component({
  selector: 'app-edit-candidat',
  templateUrl: './edit-candidat.component.html',
  styleUrls: ['./edit-candidat.component.css']
})
export class EditCandidatComponent implements OnInit {

  
  currentAxe: any
  url: string
  communes
  cercles
  parties
  idchanged
  communeId
  cercleId: any;
  idchanged2: any;
  idchanged3: any;
  partieId: any;
  id
  commune
  cercle
  obj: { numeroWinner: any; nomWinner: any; prenomWinner: any; partieWinner: any; };
    constructor(private router:Router,private activatedRoute: ActivatedRoute,private pdiService:RnpService) { }
  
    ngOnInit(): void {
      //  this.url = atob(this.activatedRoute.snapshot.params['id'])
this.id = this.activatedRoute.snapshot.params['id']
this.url = `${this.pdiService.host}/candidats/${this.id}`
console.log(this.url,"poeoeoeoeoeoeoeo")
      this.pdiService.getOneResource(this.url).subscribe(data=>{
        console.log(data,"wwwwwwwwwwwwwwwwwwwwwwwwwwww")
        this.commune = data['_embedded'].election.commune.designation
        this.cercle = data['_embedded'].election.cercle.num
        this.currentAxe = data;
        this.pdiService.getOptional(data['_links'].commune.href).subscribe(data=>{
         
          this.communeId = data['id']
        })
        this.pdiService.getOptional(data['_links'].cercle.href).subscribe(data=>{
          this.cercleId = data['id']
        })
        this.pdiService.getOptional(data['_links'].partie.href).subscribe(data=>{
          this.partieId = data['id']
        })
       

      
    

        console.log(data,"tttttttttttttttttttttttttttttttt")

        console.log(this.partieId,"zzzzzzzzzzzzzzzzzzzzzzzzzzzzz")
       
      },err=>{
    
      })
  
      this.pdiService.getResourceAll("communes").subscribe(data=>{
        this.communes = data['_embedded'].communes
      
      })
      this.pdiService.getResourceAll("cercles").subscribe(data=>{
        this.cercles = data['_embedded'].cercles
      
      })
      this.pdiService.getResourceAll("parties").subscribe(data=>{
        this.parties = data['_embedded'].parties

      
      })
    }
     calculateAge(birthday) {
      var today = new Date();
      var birthDate = new Date(birthday);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    onUpdateAxe(value: any){
      
      value.partie =`${this.pdiService.host}/parties/${value.partieId}`
      if(value.dateOfBirth)
      value.age = this.calculateAge(value.dateOfBirth)
      console.log(value,"qqqqqqqqqaaaaaaaaaaaaaaaaaaaaaeeeeeeeeeeeeerrrrr")
        this.pdiService.updateResource(this.url,value).subscribe(data1=>{
        
         this.pdiService.getOneResource(value.partie).subscribe(data=>{
          this.obj = {
            numeroWinner: value.priorite,
            nomWinner: value.lastName,
            prenomWinner :value.firstName,
            partieWinner :data.designation,
      
           }
           console.log(this.obj,"44444444444444444444444444444444444444444444444444444444444444444")
    
  if(data1['_embedded'].election.idOfWinner ==this.id){
    this.pdiService.updateResource(`${this.pdiService.host}/elections/${data1['_embedded'].election.id}`,this.obj).subscribe(data=>{
  
    })
  }
        })
       
        
        
          alert("Mise a jour effectuée avec succès")
        },err=>{
          
        })
      // })
     
    }
    onCommuneChange(event) {
      this.idchanged = event.target.value
      
    }
    oncercleChange(event){
      this.idchanged2 = event.target.value
    }
    onpartieChange(event){
      this.idchanged3 = event.target.value
    }
    gotoList(){
      this.router.navigateByUrl('elections/candidats');
    }

}
