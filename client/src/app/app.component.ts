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
  public user_register: User;
  public identity;
  public token; 
  public errorMessage;

  constructor(private _userService: UserService){
  	this.user = new User("","","","","","ROLE_USER","");
    this.user_register = new User("","","","","","ROLE_USER","");
  }

  ngOnInit(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log(this.identity);
    console.log(this.token);

  }



  public onSubmit(){
    //Datos de usuario
  	this._userService.singup(this.user).subscribe(
  		response =>{
  			
        let identity = response.user;
        this.identity = identity;

        if(this.identity._id == ""){
                alert("El usuario no esta identificado correctamente");
              }
              else{
                //Localstorage save sesion
                localStorage.setItem('identity', JSON.stringify(identity));
                //Conseguir el Token
                this._userService.singup(this.user, 'true').subscribe(
                response =>{
                  let token = response.token;
                  this.token = token;

                  if(this.token <= 0){
                    alert("El token no se ha generado correctamente");
                  }else{
                     localStorage.setItem('token', token);
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

  public logout(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    localStorage.clear();

    this.identity = null;
    this.token = null;
  }

  public onSubmitRegister(){
    console.log(this._userService);
  }
}
