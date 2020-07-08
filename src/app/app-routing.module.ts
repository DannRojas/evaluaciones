import { InitComponent } from './components/init/init.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileComponent } from './components/user/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { ResultsComponent } from './components/results/results.component';
import { EvaluationComponent } from './components/evaluation/evaluation.component';
import { Page404Component } from './components/page404/page404.component';
import { LoginComponent } from './components/user/login/login.component';
import { EvaluationsComponent } from './components/admin/evaluations/evaluations.component';
import { RecordsComponent } from './components/admin/records/records.component';
import { UsersComponent } from './components/admin/users/users.component';
import { QuestionsComponent } from './components/admin/questions/questions.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'init', component: InitComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user/profile', component: ProfileComponent }, //need login
  { path: 'results', component: ResultsComponent }, //need login
  { path: 'evaluation/:id_ev', component: EvaluationComponent }, //need login
  { path: 'evaluations', component: EvaluationsComponent},
  { path: 'records', component: RecordsComponent},
  { path: 'users', component: UsersComponent},
  { path: 'evaluations/questions/:id_ev', component: QuestionsComponent},
  { path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
