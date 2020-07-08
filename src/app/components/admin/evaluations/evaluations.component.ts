import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../../../services/evaluation.service';
import { Evaluation } from '../../../models/evaluation';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.scss']
})
export class EvaluationsComponent implements OnInit {

  constructor(private evaluationServ: EvaluationService, private userServ: UserService) {  }
  public evaluations = [];
  private evaluation: Evaluation;
  private adminId;

  ngOnInit() {
    this.getListEvaluations();
  }

  getListEvaluations() {
    this.userServ.isAuth().subscribe(user => {
      this.adminId = user.uid;
      this.evaluationServ.getAllEvaluationsAd(this.adminId).subscribe(evaluationsf => {
        this.evaluations = evaluationsf;
      });
    })
  }

  onDeleteEvaluation(idEv: string) {
    const confirmacion = confirm('Está seguro de eliminar la Evaluación?');
    if (confirmacion) {
      this.evaluationServ.deleteEvaluation(idEv);
    }
  }

  onPreUpdateEvaluation(evaluation: Evaluation) {
    this.evaluationServ.selectedEvaluation = Object.assign({}, evaluation);
  }

  onAddEvaluation() {
    this.evaluationServ.selectedEvaluation = {};
    this.evaluationServ.selectedEvaluation.adminId = this.adminId;
  }

  onRedirect() {

  }

}
