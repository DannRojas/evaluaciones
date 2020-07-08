import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { EvaluationService } from '../../../services/evaluation.service';
import { Question } from '../../../models/question';
import { ActivatedRoute, Params } from '@angular/router';
import { ResponseService } from '../../../services/response.service';
import { Response } from '../../../models/response';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  constructor( private questionServ:QuestionService, private route:ActivatedRoute, private evaluationServ: EvaluationService, private responseServ:ResponseService ) { }
  public questions = [];
  public responses = [];
  // public ques = [];
  public idEv = this.route.snapshot.params['id_ev'];

  ngOnInit() {
    this.getListQuestions();
    this.getListResponses();
  }

  getListQuestions(){
    this.questionServ.getAllQuestionsEv(this.idEv).subscribe( questionsf => {
      this.questions = questionsf;
    })
  }

  getListResponses(){
    this.responseServ.getAllResponses().subscribe( responsesf => {
      this.responses = responsesf;
    })
  }

  onDeleteQuestion(idQ: string){
    const confirmacion = confirm('está seguro de que desea eliminar la pregunta?');
    if(confirmacion){
      this.questionServ.deleteQuestion(idQ);
    }
  }

  onDeleteResponse(idR: string){
    const confirmacion = confirm('está seguro de que desea eliminar la respuesta?');
    if(confirmacion){
      this.responseServ.deleteResponse(idR);
    }
  }

  onPreUpdateQuestion(question: Question){
    this.questionServ.selectedQuestion = {};
    this.questionServ.selectedQuestion = Object.assign({}, question);
  }

  onPreUpdateResponse(response: Response){
    this.responseServ.selectedResponse = {};
    this.responseServ.selectedResponse = Object.assign({}, response);
  }

  onAddQuestion(){
    this.questionServ.selectedQuestion = {};
    this.questionServ.selectedQuestion = { idEv:this.idEv };
  }

  onAddResponse( idQuest: string ){
    this.responseServ.selectedResponse = {};
    this.responseServ.selectedResponse = { idQ: idQuest };
  }

}
