import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private userService:UserService, private afsUser: AngularFireAuth, private router: Router) { }
  public isLogged:boolean = false;
  public isAdmin:boolean = false;
  public photoUrl: string = '';
  public name: string = '';
  private user: User;

  ngOnInit() {
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.userService.isAuth().subscribe(auth =>{
      if(auth){
        this.name = auth.displayName;
        this.photoUrl = auth.photoURL;
        this.isLogged = true;
        this.isAdmn();
        console.log('User logged');
      }else{
        this.isLogged = false;
        this.router.navigate(['']);
        console.log('NOT User logged');
      }
    })
  }

  isAdmn(){
    this.userService.getOneUserName(this.name).subscribe(usr => {
      this.user = usr[0];
      console.log('admin? ',this.user.admin)
      if(this.user.admin){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
      console.log('isAdmin: ',this.isAdmin);
    })
  }

  onLogout() {
    this.isLogged = false;
    this.afsUser.auth.signOut();
    this.getCurrentUser();
  }

}
