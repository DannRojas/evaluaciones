import { UserService } from './../../../services/user.service';
import { EvaluationService } from './../../../services/evaluation.service';
import { RegistryService } from 'src/app/services/registry.service';
import { Component, OnInit } from '@angular/core';
import { Registry } from '../../../models/registry';
import { Evaluation } from '../../../models/evaluation';
import { User } from '../../../models/user';
import { Result } from '../../../models/result';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {

  constructor( private userServ:UserService, private evaluationServ: EvaluationService, private registryServ: RegistryService ) {  }

  public results=[];
  public registryes=[];
  public users=[];
  public evaluations=[];
  private user:User;
  private evaluation:Evaluation;
  private registry:Registry;


  ngOnInit() {
    this.getRegistryes();
    this.getUsers();
    this.getEvaluations();
  }

  getRegistryes(){
    this.registryServ.getAllRegistryes().subscribe(reg => {
      this.registryes = reg;
    })
  }

  getUsers(){
    this.userServ.getAllUsers().subscribe(usr =>{
      this.users = usr;
    })
  }

  getEvaluations(){
    this.evaluationServ.getAllEvaluations().subscribe(ev =>{
      this.evaluations = ev;
    })
  }

}
