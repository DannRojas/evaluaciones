import { User } from './../../models/user';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Registry } from './../../models/registry';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EvaluationService } from '../../services/evaluation.service';
import { QuestionService } from '../../services/question.service';
import { ResponseService } from '../../services/response.service';
import { Evaluation } from '../../models/evaluation';
import { ActivatedRoute, Params } from '@angular/router';
import { Question } from '../../models/question'
import { Response } from './../../models/response';
import { RegistryService } from 'src/app/services/registry.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {

  constructor(private evaluationServ: EvaluationService, private route: ActivatedRoute, private responseServ: ResponseService, private questionSev: QuestionService, private registryServ: RegistryService, private userServ: UserService, private router: Router) { }
  @ViewChild('btnOpen') btnConfirmation: ElementRef;

  public evaluation: Evaluation = {};
  public question: Question = {};
  public responses = [];
  private registry: Registry = {};
  private idEv = this.route.snapshot.params['id_ev'];
  public cont: number = 0;
  public resp: string = "";
  public correct: number = 0;
  public incorrect: number = 0;
  public note: number = 0;
  private user: User;
  public isEnd: boolean= false;

  ngOnInit() {
    this.getEvaluation(this.idEv);
    this.getListQuestions(this.cont);
    // this.getListResponses();
  }

  getEvaluation(idEvaluation: string): void {
    this.evaluationServ.getOneEvaluation(idEvaluation).subscribe(evaluation => {
      this.evaluation = evaluation;
    })
  }

  addResp() {
    const confirmacion = confirm('Está seguro de que desea enviar la respuesta?');
    if (confirmacion) {
      this.responseServ.getOneResponse(this.resp).subscribe(respons =>{
        if(respons.kind == true){
          this.correct = this.correct+1;
        }else{
          this.incorrect = this.incorrect+1;
        }
      })
      this.cont = this.cont + 1;
      this.getListQuestions(this.cont);
    }
  }

  getListQuestions(cont) {
    this.questionSev.getAllQuestionsEv(this.idEv).subscribe(questionsf => {
      if (cont < questionsf.length) {
        this.question = questionsf[cont];
        this.getListResponses(this.question.idQ);
      } else {
        console.log('ingresando resultado: ');
        this.addResult();
      }
    })
  }

  getListResponses(idQ) {
    this.responseServ.getAllResponsesQue(idQ).subscribe(responsesf => {
      this.responses = responsesf;
    })
  }

  addResult(){
    this.note = this.setNote();
    this.userServ.isAuth().subscribe(usr => {
      this.userServ.getOneUserName(usr.displayName).subscribe(user => {
        this.registry = {idUsr: user[0].id, idEv: this.idEv, correctQ: this.correct, incorrectQ: this.incorrect, note: this.note}
        console.log('registro ingresado: ',this.registry);
        this.isEnd = true;
        this.registryServ.addRegistry(this.registry);
        this.btnConfirmation.nativeElement.click();
      })
    })
  }

  setNote(){
    var total = this.correct+this.incorrect;
    var prom = 100/total;
    var nota = 100 -(prom*this.incorrect);
    return nota;
  }

  onRedirect(): void{
    this.router.navigate(['home']);
  }

}
