import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'user-edit',
  templateUrl: '../views/user-edit.html',
  providers: [UserService]
})

export class UserEditComponent  implements OnInit{

	public titulo: string;
	public user:User;
	public identity;
	public token;
	public alertUpdate; 
	constructor(private _userService:UserService){
		this.titulo = 'Actualizar mis datos';
		this.user = new User("","","","","","ROLE_USER","");
		this.identity = this._userService.getIdentity();
   		this.token = this._userService.getToken();
   		this.user = this.identity;

	}
	ngOnInit(){
		console.log('user-edit.component.ts cargado');
	}

	public onSubmit(){
		console.log(this.user);
		this._userService.updateUser(this.user).subscribe( 
			response => {
				console.log(this.user);
				this.alertUpdate = 'Se actualizo correctamente'
				this.identity = this._userService.getIdentity();
				this.user = this.identity;
			},error =>{
	        var errorMessage = <any>error;
	        if(errorMessage != null){
	          console.log(error);
	          var body = JSON.parse(error._body);
	          this.alertUpdate  = body.message;
	          }
      }
		);
	}

}
