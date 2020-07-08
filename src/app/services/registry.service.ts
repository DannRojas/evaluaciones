import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Registry } from '../models/registry';


@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  constructor(private afs: AngularFirestore) { 
    this.registryesCollection = afs.collection<Registry>('registryes');
    this.registryes = this.registryesCollection.valueChanges();
  }

  private registryesCollection: AngularFirestoreCollection<Registry>;
  private registryes: Observable<Registry[]>;
  private registryDoc: AngularFirestoreDocument<Registry>;
  private registry: Observable<Registry>;
  public selectedRegistry: Registry = {};

  getAllRegistryes(){
    return this.registryes = this.registryesCollection.snapshotChanges().pipe(map( changes => {
      return changes.map( action => {
        const data = action.payload.doc.data() as Registry;
        data.idReg = action.payload.doc.id;
        return data;
      })
    }))
  }

  getAllRegistryesUsr(id_usr: string){
    this.registryesCollection = this.afs.collection('registryes', ref => ref.where('idUsr', '==', id_usr));
    return this.registryes = this.registryesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Registry;
        data.idReg = action.payload.doc.id;
        return data;
      })
    }))
  }

  getOneQuestion(idRegistry: string){
    this.registryDoc = this.afs.doc<Registry>(`registryes/${idRegistry}`);
    return this.registry = this.registryDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists == false){
        return null;
      }else{
        const data = action.payload.data() as Registry;
        data.idReg = action.payload.id;
        return data;
      }
    }));
  }

  addRegistry(reg: Registry): void{
    this.registryesCollection.add(reg);
  }

  updateRegistry(reg: Registry): void{
    let idRegistry = reg.idReg;
    this.registryDoc = this.afs.doc<Registry>(`registryes/${idRegistry}`);
    this.registryDoc.update(reg);
  }

  deleteRegistry(idRegistry: string): void{
    this.registryDoc = this.afs.doc<Registry>(`registryes/${idRegistry}`);
    this.registryDoc.delete();
  }

}
