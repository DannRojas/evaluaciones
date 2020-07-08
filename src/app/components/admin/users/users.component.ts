import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private userServ: UserService) { }
  public users = [];
  private user: User;

  ngOnInit() {
    this.getListUsers();
  }

  getListUsers(){
    this.userServ.getAllUsers().subscribe(usersf => {
      this.users = usersf;
      console.log('users: ',this.users);
    })
  }

  onDeleteUser(idUser: string){
    const confirmacion = confirm('Está seguro de que desea eliminar este usuario?');
    if(confirmacion){
      this.userServ.deleteUser(idUser);
    }
  }

  onAddUser(){
    this.userServ.selectedUser = {};
    this.userServ.isAuth().subscribe(usuario => {
      this.userServ.selectedUser.adminId = usuario.uid;
      this.userServ.selectedUser.admin = false;
      this.userServ.selectedUser.photoUrl = "https://cdn.pixabay.com/photo/2012/04/26/19/43/profile-42914_960_720.png"
    })
  }
}
