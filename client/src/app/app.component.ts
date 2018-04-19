import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent  implements OnInit{
  public title = 'Songlify';
  public user: User;
  public identity = false;
  public token; 
  public errorMessage;

  constructor(private _userService: UserService){
  	this.user = new User("","","","","","ROLE_USER","");
  }

  ngOnInit(){
  }

  public onSubmit(){
    
  	this._userService.singup(this.user).subscribe(
  		response =>{
  			console.log(response);
        let identity = response.user;
        this.identity = identity;
  		},
  		error =>{
  			var errorMessage = <any>error;
  			if(errorMessage != null){
          var body = JSON.parse(error._body):
          this.errorMenssage
  			}
  		}
  	);
  }
}
