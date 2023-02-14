import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CandidatsComponent } from './components/candidats/candidats.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { EditCandidatComponent } from './components/edit-candidat/edit-candidat.component';
import { ElectionsComponent } from './components/elections/elections.component';
import { EditElectionComponent } from './components/edit-election/edit-election.component';
import { ElectionElmarsaComponent } from './components/election-elmarsa/election-elmarsa.component';
import { EditElmarsaElectionComponent } from './components/edit-elmarsa-election/edit-elmarsa-election.component';
@NgModule({
  declarations: [
    AppComponent,
    CandidatsComponent,
    LoginComponent,
    EditCandidatComponent,
    ElectionsComponent,
    EditElectionComponent,
    ElectionElmarsaComponent,
    EditElmarsaElectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthGuard,{
    provide : HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
