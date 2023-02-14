import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RnpService {


  host= 'http://localhost:8087'

  jwtToken = null;
 constructor(private http: HttpClient) { }

 getResourceAllByProjection(resource: String,projection:string):Observable<any[]>{
   
  return this.http.get<any[]>(`${this.host}/${resource}?${projection}&sort=id,asc`);
}
getOptional(link){
  return this.http.get<any[]>(`${link}`);

}
 getResourceAll(resource: String):Observable<any[]>{
   
   return this.http.get<any[]>(`${this.host}/${resource}?size=1000`);
}
getResourceByResourceId(resource: String,resource2:string,id:number):Observable<any[]>{
   
  return this.http.get<any[]>(`${this.host}/${resource}/search/findBy${resource2}Id?id=${id}`);
}
getResourceByResourceId2(resource: String,resource2:string,id:number):Observable<any[]>{
  
  return this.http.get<any[]>(`${this.host}/${resource}/search/findBy${resource2}IdAndCercleNum?id=${id}&i=15`);
}
 getResource(resource: String,page:number,size:number):Observable<any[]>{ 
     return this.http.get<any[]>(`${this.host}/${resource}?page=${page}&size=${size}`);
 }
 getResourceById(resource: String,id:number):Observable<any[]>{ 
  return this.http.get<any[]>(`${this.host}/${resource}/${id}`);
}


 addResource(resource: string,value:any):Observable<any>{ 
   return this.http.post<any>(`${this.host}/${resource}`,value);
}

 getResourceByKeyword(resource: String,page:number,size:number,mc:string,source:string):Observable<any[]>{ {}

   return this.http.get<any[]>(`${this.host}/${resource}/search/by${source}Page?mc=${mc}&page=${page}&size=${size}`);
}

getResourceByKeywordNoPage(resource: String,size:number,mc:string,source:string):Observable<any[]>{ 
 return this.http.get<any[]>(`${this.host}/${resource}/search/by${source}Page?mc=${mc}&size=${size}`);
}


deleteResource(resource:string,url:string){ 

return this.http.delete(url);
}
getOneResource(url:string):Observable<any>{ 

return this.http.get<any>(url)
}
updateResource(url:string,data:any){ 

 console.log(url)
 return this.http.patch(url,data)
}
login(user){ 
  return this.http.post(this.host+"/login",user,{observe: 'response'})
}

saveToken(jwt){
  localStorage.setItem('token',jwt);
}
getFile(id){
  return this.http.get(this.host+"/fiche/"+id,{responseType: 'arraybuffer'})
}
loadToken(){
  this.jwtToken = localStorage.getItem('token');
  console.log(this.jwtToken,"ùùùùùùùùùùùùùùùùùùùùùùù")
  return this.jwtToken
}
download(url){
  console.log(url,"azazazzaazzzzzzzzzzzzz")
  return this.http.get(url)
}
logout(){
  this.jwtToken = null
  localStorage.removeItem('token')

}
loggedIn(){
  return !!localStorage.getItem('token')
}
}
