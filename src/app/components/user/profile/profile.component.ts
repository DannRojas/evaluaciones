import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService) { }
  user: User = {
    name: '',
    email: '',
    photoUrl: ''
  };
  
  public providerId:string = null;

  ngOnInit() {
    this.userService.isAuth().subscribe(auth => {
      if(auth){
        this.user.name = auth.displayName;
        this.user.email = auth.email;
        this.user.photoUrl = auth.photoURL;
        this.providerId = auth.providerData[0].providerId;
        console.log('User: ', this.user);
      }else{
        console.log('User no logged ');
      }
    })
  }
}
