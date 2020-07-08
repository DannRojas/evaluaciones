import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Response } from '../models/response';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  constructor(private afs: AngularFirestore) { 
    // this.responsesCollection = afs.collection<Response>('responses');
    // this.responses = this.responsesCollection.valueChanges();
  }

  private responsesCollection:AngularFirestoreCollection<Response>;
  private responses:Observable<Response[]>;
  private responseDoc:AngularFirestoreDocument<Response>;
  private response:Observable<Response>;
  public selectedResponse: Response = {  };

  getAllResponses(){
    this.responsesCollection = this.afs.collection<Response>('responses');
    return this.responses = this.responsesCollection.snapshotChanges().pipe(map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as Response;
        data.idR = action.payload.doc.id;
        return data;
      })
    }))
  }

  getAllResponsesQue(id_q: string){
    this.responsesCollection = this.afs.collection('responses',ref => ref.where('idQ','==',id_q));
    return this.responses = this.responsesCollection.snapshotChanges().pipe(map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as Response;
        data.idR = action.payload.doc.id;
        return data;
      })
    }))
  }  

  getOneResponse(idResponse: string){
    this.responseDoc = this.afs.doc<Response>(`responses/${idResponse}`);
    return this.response = this.responseDoc.snapshotChanges().pipe(map( action => {
      if(action.payload.exists == false){
        return null;
      }else{
        const data = action.payload.data() as Response;
        data.idR = action.payload.id;
        return data;
      }
    }));
  } 

  addResponse(resp: Response):void {
    this.responsesCollection.add(resp);
  }

  updateResponse(resp: Response):void {
    let idResponse = resp.idR;
    this.responseDoc = this.afs.doc<Response>(`responses/${idResponse}`);
    this.responseDoc.update(resp);
  }

  deleteResponse(idResponse: string):void {
    this.responseDoc = this.afs.doc<Response>(`responses/${idResponse}`);
    this.responseDoc.delete();
  }

}
