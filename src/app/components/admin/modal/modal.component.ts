import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EvaluationService } from '../../../services/evaluation.service';
import { UserService } from '../../../services/user.service';
import { QuestionService } from '../../../services/question.service';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(public evaluationServ: EvaluationService, public userServ: UserService, public questionServ: QuestionService, public responseServ: ResponseService) { }
  @ViewChild('btnClose') btnClose: ElementRef;
  @ViewChild('btnCloseU') btnCloseU: ElementRef;
  @ViewChild('btnCloseQ') btnCloseQ: ElementRef;
  @ViewChild('btnCloseR') btnCloseR: ElementRef;

  public kind:any = 2;

  public evAct:boolean = false;
  public usrAct:boolean = false;
  public quesAct:boolean = false;
  public resAct:boolean = false;

  ngOnInit() {
  }

  onSaveEvaluation():void {
    if(this.evaluationServ.selectedEvaluation.idEv == null){
      if(this.evaluationServ.selectedEvaluation.title!=null && this.evaluationServ.selectedEvaluation.coverPage!=null && this.evaluationServ.selectedEvaluation.description!=null){
        this.evaluationServ.addEvaluation(this.evaluationServ.selectedEvaluation);
        this.evAct = false;
        this.btnClose.nativeElement.click();
      }else{
        this.evAct = true;
      }
    }else{
      if(this.evaluationServ.selectedEvaluation.title!="" && this.evaluationServ.selectedEvaluation.coverPage!="" && this.evaluationServ.selectedEvaluation.description!=""){
        this.evaluationServ.updateEvaluation(this.evaluationServ.selectedEvaluation);
        this.evAct = false;
        this.btnClose.nativeElement.click();
      }else{
        this.evAct = true;
      }
    }
    this.evaluationServ.selectedEvaluation = {};
  }

  desacEv(){
    this.evAct=false;
  }

  onSaveUser(): void {
    if(this.userServ.selectedUser.email!=null && this.userServ.selectedUser.password!=null && this.userServ.selectedUser.name!=null){
      this.userServ.addUser(this.userServ.selectedUser);
      this.usrAct = false;
      this.btnCloseU.nativeElement.click();
    }else{
      this.usrAct = true;
    }
    this.userServ.selectedUser = {};
  }

  desacUs(){
    this.usrAct=false;
  }

  onSaveQuestion(): void{
    if(this.questionServ.selectedQuestion.idQ == null){
      if(this.questionServ.selectedQuestion.description!=null){
        this.questionServ.addQuestion(this.questionServ.selectedQuestion);
        this.quesAct = false;
        this.btnCloseQ.nativeElement.click();
      }else{
        this.quesAct = true;
      }
    }else{
      if(this.questionServ.selectedQuestion.description!=null){
        this.questionServ.updateQuestion(this.questionServ.selectedQuestion);
        this.quesAct = false;
        this.btnCloseQ.nativeElement.click();
      }else{
        this.quesAct = true;
      }
    }
    this.questionServ.selectedQuestion = {};
  }

  desacQu(){
    this.quesAct = false;
  }

  onSaveResponse(): void{
    if(this.kind==1){
      this.responseServ.selectedResponse.kind = true;
    }else{
      this.responseServ.selectedResponse.kind = false;
    }
    this.kind = 2;
    if(this.responseServ.selectedResponse.description!=null){
      this.responseServ.addResponse(this.responseServ.selectedResponse);
      this.resAct = false;
      this.btnCloseR.nativeElement.click();
    }else{
      this.resAct = true;
    }
    this.responseServ.selectedResponse = {};
  }

  desacRs(){
    this.resAct = false;
  }

}