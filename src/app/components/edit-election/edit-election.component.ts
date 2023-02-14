import { Component, Host, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { RnpService } from 'src/app/services/rnp-service.service';

@Component({
  selector: 'app-edit-election',
  templateUrl: './edit-election.component.html',
  styleUrls: ['./edit-election.component.css']
})
export class EditElectionComponent implements OnInit {

  
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
  candidat1: any;
  candidat2: any;
  candidat3: any;
  nb1
  nb2
  nb3
  partie1
  partie2: any;
  partie3: any;
  commune
  cercle
    constructor(private router:Router,private activatedRoute: ActivatedRoute,private pdiService:RnpService) { }
  
    ngOnInit(): void {
      this.url = atob(this.activatedRoute.snapshot.params['id'])

     this.pdiService.getOneResource(this.url).subscribe(data=>{
       this.currentAxe = data;
       console.log(data,"yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
       this.commune = data['_embedded'].candidats[0].commune.designation
       this.cercle = data['_embedded'].candidats[0].cercle.num
       let url = data['_links'].candidats.href;
      let newUrl =  url.replace('{?projection}', '')
       this.pdiService.getOptional(newUrl).subscribe(data=>{
          this.candidat1=data['_embedded'].candidats[0] 
          this.candidat2=data['_embedded'].candidats[1] 
          this.candidat3=data['_embedded'].candidats[2] 
          console.log(this.candidat2,"yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
          this.nb1 =  this.candidat1.nombreVote
          this.nb2 =  this.candidat2.nombreVote
          this.nb3 =  this.candidat3.nombreVote
       this.partie1 = data['_embedded'].candidats[0].partie
       this.partie2 = data['_embedded'].candidats[1].partie
       this.partie3 = data['_embedded'].candidats[2].partie
       
          
       })
   
      

      
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
       console.log(this.parties,"eeeeeeeeeeeeeeeeeeeeee")
     
     })
   }
    onUpdateAxe(value: any){
      console.log(value,'nnnnnnnnnnnnnnn')
      // this.pdiService.getResourceById("parties",1).subscribe(data=>{
      //   value.partie = data
      value.voix = value.nmbMosa - value.feuillesSupprimes
      if(value.pourcentage!=undefined && value.pourcentage!=null){
        if(value.nmbMosa!=undefined && value.nmbMosa!=null&&value.nmbInscrits!=undefined && value.nmbInscrits!=null){
      value.pourcentage = ((value.nmbMosa / value.nmbInscrits)*100).toFixed(2);
        }
      }
      console.log(value.nb1+value.nb2+value.nb3,"ddddddddddddddddddd")
      if(value.voix == value.nb1+value.nb2+value.nb3){
        value.confirmationSum = true
      }else{
        value.confirmationSum = false
      }
      let max = Math.max(value.nb1, value.nb2, value.nb3);
     
      if((value.nb1 == value.nb2) && (value.nb1 == value.nb3)&&(value.nb3 == value.nb2)){
        let min = Math.min(this.candidat1.age,this.candidat2.age,this.candidat3.age);
        console.log(min,"22222222222222222222222222222")
        if(min==this.candidat1.age){
          value.idOfWinner=this.candidat1.id 
          value.nomWinner =this.candidat1.lastName
          value.prenomWinner =this.candidat1.firstName
          value.numeroWinner = 1
          value.partieWinner = this.partie1?.designation
          value.partieWinnerAr = this.partie1?.designationArab
           
          
        }else if(min==this.candidat2.age){
          value.idOfWinner=this.candidat2.id 
          value.nomWinner =this.candidat2.lastName
          value.prenomWinner =this.candidat2.firstName
          value.numeroWinner = 2
          value.partieWinner = this.partie2?.designation
          value.partieWinnerAr = this.partie2?.designationArab
        }else{
          value.idOfWinner=this.candidat3.id 
          value.nomWinner =this.candidat3.lastName
          value.prenomWinner =this.candidat3.firstName
          value.partieWinner = this.partie3?.designation
          value.partieWinnerAr = this.partie3?.designationArab
          value.numeroWinner = 2
        }
      }
      else{
      if(max==value.nb1){
        value.idOfWinner=this.candidat1.id 
        value.nomWinner =this.candidat1.lastName
        value.prenomWinner =this.candidat1.firstName
        value.numeroWinner = 1
        value.partieWinner = this.partie1?.designation
        value.partieWinnerAr = this.partie1?.designationArab
         
        
      }else if(max==value.nb2){
        value.idOfWinner=this.candidat2.id 
        value.nomWinner =this.candidat2.lastName
        value.prenomWinner =this.candidat2.firstName
        value.numeroWinner = 2
        value.partieWinner = this.partie2?.designation
        value.partieWinnerAr = this.partie2?.designationArab
      }else{
        value.idOfWinner=this.candidat3.id 
        value.nomWinner =this.candidat3.lastName
        value.prenomWinner =this.candidat3.firstName
        value.partieWinner = this.partie3?.designation
        value.partieWinnerAr = this.partie3?.designationArab
        value.numeroWinner = 2
      }
    }
      console.log(value,'èèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèèè')
      this.pdiService.updateResource(this.url,value).subscribe(data=>{
          
        alert("Mise a jour effectuée avec succès")
      },err=>{
        
      })
   
      // this.candidat1.nombreVote = value.nb1
      // console.log( this.candidat1.nombreVote ,"yyyyyyyyyyyyyyyyyyyyyyyyyyyyyy")
      let d1=  {
        nombreVote: value.nb1
       }
     
      this.pdiService.updateResource(`${this.pdiService.host}/candidats/${this.candidat1.id}`,d1).subscribe(data=>{
         
       
      },err=>{
        
      })
     
    let d2=  {
      nombreVote: value.nb2
     }
      this.pdiService.updateResource(`${this.pdiService.host}/candidats/${this.candidat2.id}`,d2).subscribe(data=>{
         
       
      },err=>{
        
      })
      let d3=  {
        nombreVote: value.nb3
       }
      // this.candidat3.nombreVote = value.nb3
      this.pdiService.updateResource(`${this.pdiService.host}/candidats/${this.candidat3.id}`,d3).subscribe(data=>{
         
        // alert("Mise a jour effectuée avec succès")
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
      this.router.navigateByUrl('elections/elections');
    }


}
