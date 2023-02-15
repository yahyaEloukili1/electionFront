import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandidatsComponent } from './components/candidats/candidats.component';
import { ElectionsComponent } from './components/elections/elections.component';
import { EditCandidatComponent } from './components/edit-candidat/edit-candidat.component';
import { LoginComponent } from './components/login/login.component';
import { EditElectionComponent } from './components/edit-election/edit-election.component';
import { ElectionElmarsaComponent } from './components/election-elmarsa/election-elmarsa.component';
import { EditElmarsaElectionComponent } from './components/edit-elmarsa-election/edit-elmarsa-election.component';
import { ElectionElmarsaSeleonBureauComponent } from './components/election-elmarsa-seleon-bureau/election-elmarsa-seleon-bureau.component';

const routes: Routes = [{path: "elections/candidats",component: CandidatsComponent},
{path: "elections/elections",component: ElectionsComponent},
{path: "elections/editCandidat/:id",component: EditCandidatComponent},
{path: "elections/editElection/:id",component: EditElectionComponent},
{path: "elections/electionElmarsa",component: ElectionElmarsaComponent},
{path: "elections/electionElmarsaSelonBureau",component: ElectionElmarsaSeleonBureauComponent},
{path: "elections/editElectionElmarsa/:id",component: EditElmarsaElectionComponent},
{path: "elections/login",component: LoginComponent},
{path: "elections", redirectTo : "elections/candidats", pathMatch: 'full'},
{path: "", redirectTo : "elections/candidats", pathMatch: 'full'},];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
