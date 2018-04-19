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
    //Datos de usuario
  	this._userService.singup(this.user).subscribe(
  		response =>{
  			
        let identity = response.user;
        this.identity = identity;

        if(this.identity._id == ""){
          alert("El usuario no esta identificado correctamente");
              }else{
                //Localstorage save sesion
                //Conseguir el Token
              this._userService.singup(this.user, 'true').subscribe(
                response =>{
                  let token = response.token;
                  this.token = token;

                  if(this.token <= 0){
                    alert("El token no se ha generado correctamente");
                  }else{
                     console.log(token);
                     console.log(identity);
                  }
                },
                error =>{
                  var errorMessage = <any>error;
                  if(errorMessage != null){
                    console.log(error);
                    var body = JSON.parse(error._body);
                    this.errorMessage = body.message;
                  }
                }
            );
        }
  		},
  		error =>{
  			var errorMessage = <any>error;
  			if(errorMessage != null){
          console.log(error);
          var body = JSON.parse(error._body);
          this.errorMessage = body.message;
           			}
  		}
  	);
  }
}
