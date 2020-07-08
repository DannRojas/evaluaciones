import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Question } from '../models/question';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private afs: AngularFirestore) { 
    this.questionsCollection = afs.collection<Question>('questions');
    this.questions = this.questionsCollection.valueChanges();
  }

  private questionsCollection: AngularFirestoreCollection<Question>;
  private questions: Observable<Question[]>;
  private questionDoc: AngularFirestoreDocument<Question>;
  private question: Observable<Question>;
  public selectedQuestion: Question = {  };

  getAllQuestions(){
    return this.questions = this.questionsCollection.snapshotChanges().pipe(map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as Question;
        data.idQ = action.payload.doc.id;
        return data;
      })
    }))
  }

  getAllQuestionsEv(id_ev: string){
    this.questionsCollection = this.afs.collection('questions', ref => ref.where('idEv', '==', id_ev));
    return this.questions = this.questionsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Question;
        data.idQ = action.payload.doc.id;
        return data;
      })
    }))
  }

  getOneQuestion(idQuestion: string){
    this.questionDoc = this.afs.doc<Question>(`questions/${idQuestion}`);
    return this.question = this.questionDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists == false){
        return null;
      }else{
        const data = action.payload.data() as Question;
        data.idQ = action.payload.id;
        return data;
      }
    }));
  }

  addQuestion(ques: Question): void{
    this.questionsCollection.add(ques);
  }

  updateQuestion(ques: Question): void{
    let idQuestion = ques.idQ;
    this.questionDoc = this.afs.doc<Question>(`questions/${idQuestion}`);
    this.questionDoc.update(ques);
  }

  deleteQuestion(idQuestion: string): void{
    this.questionDoc = this.afs.doc<Question>(`questions/${idQuestion}`);
    this.questionDoc.delete();
  }

}
