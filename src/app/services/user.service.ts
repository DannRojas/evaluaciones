import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auth } from 'firebase';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCollection: AngularFirestoreCollection<User>;
  private users: Observable<User[]>;
  private userDoc: AngularFirestoreDocument<User>;
  private user: Observable<User>;
  public selectedUser: User = {id: null};

  constructor(private afsAuth: AngularFireAuth, private afs:AngularFirestore) { 
  }

  registerUser(email: string, pass: string){
    return new Promise ((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass).then( userData =>  resolve(userData),err => reject(err));
    })
  }

  loginEmailUser(email: string, pass: string){
    return new Promise(( resolve, reject) => (
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass).then(userData => resolve(userData),
      err => reject(err))
    ));
  }

  loginFacebookUser(){
    const adId:string = null;
    const pass:string = null
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider()).then(credential => {
      this.addUserData(credential.user, adId, pass)
    })
  }

  loginGogleUser(){
    const adId:string = null;
    const pass:string = null
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(credential => {
      this.addUserData(credential.user, adId, pass)
    })
  }

  logoutUser(){
    return this.afsAuth.auth.signOut();
  }

  isAuth(){
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  addUserData(user, adId: string, pass:string){
    let adm:boolean = true;
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      id: user.uid,
      adminId: user.uid,
      name: user.displayName,
      email: user.email,
      password: pass,
      admin: adm
    }
    return userRef.set(data, {merge: true});
  }

  /****************************************/

  getAllUsers(){
    this.usersCollection = this.afs.collection<User>('users');
    return this.users = this.usersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as User;
        data.id = action.payload.doc.id;
        return data;
      });
    }));
  }

  getOneUser(id: string){
    this.userDoc = this.afs.doc<User>(`users/${id}`);
    return this.user = this.userDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists == false){
        return null;
      }else{
        const data = action.payload.data() as User;
        data.id = action.payload.id;
        return data;
      }
    }))
  }

  getOneUserEandP(email:string, pass:string){
    this.usersCollection = this.afs.collection('users', ref => ref.where('email', '==', email).where('password','==',pass));
    return this.users = this.usersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as User;
        data.id = action.payload.doc.id;
        return data;
      })
    }))
  }

  getOneUserName(name:string){
    this.usersCollection = this.afs.collection('users', ref => ref.where('name', '==', name));
    return this.users = this.usersCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as User;
        data.id = action.payload.doc.id;
        return data;
      })
    }))
  }

  addUser(user: User): void{
    this.usersCollection.add(user);
  }

  deleteUser(idUser: string): void{
    this.userDoc = this.afs.doc<User>(`users/${idUser}`);
    this.userDoc.delete();
  }

}
