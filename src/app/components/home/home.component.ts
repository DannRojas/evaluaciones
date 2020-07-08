import { EvaluationService } from './../../services/evaluation.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Evaluation } from '../../models/evaluation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private userService:UserService, private evaluationsS: EvaluationService, private router: Router) { 
    // this.getListEvaluation();
  }
  public isLogged: boolean;
  public evaluations:any[]=null;
  public evaluation = '';
  public user;
  public fecha = new Date();

  ngOnInit() {
    this.getListEvaluation();
    console.log(this.fecha);
  }  

  getListEvaluation(){
    this.userService.isAuth().subscribe(usr => {
      this.user = usr;
      this.userService.getOneUserName(this.user.displayName).subscribe(usuario => {
        console.log('usuario: ',usuario[0].name);
        this.evaluationsS.getAllEvaluationsAd(usuario[0].adminId).subscribe(evaluationss => {
          this.evaluations = evaluationss;
          console.log('evaluaciones', this.evaluations);
        })
      })
    })
  }

  onRedirect(id: string): void{
    const confirmation = confirm('¿Está seguro de comenzar la evaluación?');
    if(confirmation){
      this.router.navigate(['evaluation/',id]);
    }
  }

}