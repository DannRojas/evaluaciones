import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private userService:UserService) { }
  hide = true ;
  public email: string = "";
  public password: string = "";
  private user: User[] = null;
  public validation:boolean = false;

  em = new FormControl('', [Validators.required, Validators.email]);

  ngOnInit() {
    this.getCurrentUser();
  }

  getErrorMessage() {
    return this.em.hasError('required') ? 'Este es un campo obligatorio' :
        this.em.hasError('email') ? 'No es un correo electrónico válido' :
            '';
  }

  getListUsers(){
    this.userService.getOneUserEandP(this.email,this.password).subscribe(usr => {
      this.user = usr;
      if(this.user.length > 0){
        this.userService.registerUser(this.email,this.password).then((res) =>{
          this.userService.isAuth().subscribe(login => {
            if(login){
              login.updateProfile({
                displayName: this.user[0].name,
                photoURL: this.user[0].photoUrl
              }).then(()=> {
              }).catch((error)=> console.log('error: ',error))
            }
          })
        }).catch((err)=> {
          console.log('err: ',err);
          this.onLogin();
          // this.onLoginRedirect();
        });
        this.router.navigate(['init']);
      }else{
        console.log('user incorrect');
        this.validation = true;
      }
    });
  }

  getCurrentUser(){
    this.userService.isAuth().subscribe(auth =>{
      if(auth){
        this.router.navigate(['home']);
      }else{
      }
    })
  }

  onLogin(){
    this.userService.loginEmailUser(this.email, this.password).then((res) => {
      this.userService.isAuth().subscribe(user => {
      })
      this.email = "";
      this.password = "";
      this.router.navigate(['init']);
    }).catch(err => console.log('error: ',err.message));
  }

  onLoginGoogle(): void {
    this.userService.loginGogleUser().then((res) => {
      this.router.navigate(['evaluations']);
    }).catch(err => console.log('error: ',err.message));
  }

  onLoginFacebook(): void {
    this.userService.loginFacebookUser().then((res) => {
      this.router.navigate(['evaluations']);
    })
  }

  onLoginRedirect(): void{
    this.router.navigate(['home']);
  }
}