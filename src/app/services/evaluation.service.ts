import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Evaluation } from '../models/evaluation';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  constructor(private afs: AngularFirestore) { 
    // this.evaluationsCollection = afs.collection<Evaluation>('evaluaciones');
    // this.evaluations = this.evaluationsCollection.valueChanges();
  }

  private evaluationsCollection: AngularFirestoreCollection<Evaluation>;
  private evaluations: Observable<Evaluation[]>;
  private evaluationDoc: AngularFirestoreDocument<Evaluation>;
  private evaluation: Observable<Evaluation>;
  public selectedEvaluation: Evaluation = {idEv: null};

  getAllEvaluations(){
    this.evaluationsCollection = this.afs.collection<Evaluation>('evaluaciones');
    return this.evaluations = this.evaluationsCollection.snapshotChanges().pipe(map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as Evaluation;
        data.idEv = action.payload.doc.id;
        return data;
      });
    }));
  }

  getAllEvaluationsAd(idAdmin:string){
    this.evaluationsCollection = this.afs.collection<Evaluation>('evaluaciones');
    this.evaluationsCollection = this.afs.collection('evaluaciones', ref => ref.where('adminId', '==', idAdmin));
    return this.evaluations = this.evaluationsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Evaluation;
        data.idEv = action.payload.doc.id;
        return data;
      })
    }))
  }

  getOneEvaluation(idEvaluation: string){
    this.evaluationDoc = this.afs.doc<Evaluation>(`evaluaciones/${idEvaluation}`);
    return this.evaluation = this.evaluationDoc.snapshotChanges().pipe(map(action => {
      if (action.payload.exists == false) {
        return null;
      }else{
        const data = action.payload.data() as Evaluation;
        data.idEv = action.payload.id;
        return data;
      }
    }));
  }

  addEvaluation(ev: Evaluation): void {
    this.evaluationsCollection.add(ev);
  }

  updateEvaluation(ev: Evaluation): void {
    let idEvaluation = ev.idEv;
    this.evaluationDoc = this.afs.doc<Evaluation>(`evaluaciones/${idEvaluation}`);
    this.evaluationDoc.update(ev);
  }

  deleteEvaluation(idEvaluation: string): void {
    this.evaluationDoc = this.afs.doc<Evaluation>(`evaluaciones/${idEvaluation}`);
    this.evaluationDoc.delete();
  }
}
