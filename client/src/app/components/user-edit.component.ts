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
				
				if(!response.user)
					this.alertUpdate  = 'El usuario no se ha actualizado';
				else{
					//this.user = response.user;
					localStorage.setItem('identity', JSON.stringify(this.user));
					document.getElementById("identity_name").innerHTML = this.user.name;


					if(!this.filesToUpload){
						//Redirecion
					}
					else{
						this.makeFileRequest(this.url+ 'upload-image-user/'+ this.user._id,[], this.filesToUpload).then(
							(result: any) => {
								this.user.image = result.image;

								localStorage.setItem('identity', JSON.stringify(this.user));

								console.log(this.user);
							}
						);
					}

					this.alertUpdate  = 'El usuario se ha actualizado correctamente';

				}
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

	public filesToUpload: Array<File>;

	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>> fileInput.target.files;
	}

	makeFileRequest(url: string, params: Array<string>, files: Array<File>){
		var token = this.token;

		return new Promise(function(resolve, reject){
			var formData: any = new formData();
			var xhr = new XMLHttpRequest();

			for(var i = 0; i < files.length; i++){
				formData.append("image", file[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						resolve(JSON.parse(xhr.response));
					}
					else{
						reject(xhr.response);
					}	
				}
			}
			xhr.open('POST', url, true);
			xhr.setRequestHeader('Authorization', token);
			xhr.send(formData);
		});

	}


}
