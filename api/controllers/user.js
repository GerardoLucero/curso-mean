'use strinct'
var fs = require('fs');
var path = require('path');
var User = require('../models/user');
var bcrypt =require('bcrypt-nodejs');
const dd = require('dump-die');
var jwt = require('../services/jwt');


function pruebas(req, res){
	res.status(200).send({
		message: 'Probando una accion del controlador'
	});
}

function saveUser(req, res){
	var user = new User();
	var params = req.body;
	user.name = params.name;
	user.surname = params.surname;
	user.email = params.email;
	user.role = 'ROLE_ADMIN';
	user.image = 'null';
	if(params.password){
		//Encriptar contraseña y guardar datos
		 bcrypt.hash(params.password, null, null, function(err, hash){
		 	user.password = hash;
		 	if(user.name != null && user.surname != null && user.email != null){
		 		//Guardar un usuario
		 		user.save(function(err, userStored){
		 			if(err){
		 				res.status(500).send({message: 'Error al guardar el usuario'});
		 			}
		 			else{
		 				if(!userStored){
		 					res.status(400).send({message: 'No se ha registrado el usuario'});
		 				}
		 				else{
		 					res.status(200).send({user: userStored});
		 				} 
		 			}
		 		});
		 	}else{
		 		res.status(200).send({message: 'Rellena todos los campos'});
		 	}
		});
	}
	else{
		res.status(500).send({message: 'Introduce la contraseña'});
	}
}

function loginUser(req, res){
	var params = req.body;
	console.log(params);
	var email = params.email;
	var password = params.password;
	if(email != ""){
			User.findOne({email: email.toLowerCase()}, (err, user) =>{
			if(err){
				res.status(500).send({menssage: 'Error en la petición'});
			}else{
				if(!user){
					res.status(404).send({message: 'El usuario no existe'})
				}
				else{
					bcrypt.compare(password, user.password, function(err, check){
						if(check){
							//Devolver datos del usuario logueado
							if(params.gethash){
								//Devuelve token jwt
								res.status(200).send({
									token: jwt.createToken(user)
								});
							}
							else{
								res.status(200).send({hola: user});
							}
						}
						else{
							res.status(404).send({message: 'Los datos son incorrectos'});
						}
					});
				}
			}
		});
	}
	else{
		res.status(500).send({menssage: 'email vacio'});
	}
}

function updateUser(req, res){
	var userId = req.params.id;
	var update = req.body;
	User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
		if(err){
			res.status(404).send({message: 'Error al actualizar el usuario'});
		}
		else{
			if(!userUpdated){
				res.status(404).send({message: 'Error al actualizar el usuario'});
			}
			else{
				res.status(200).send({user: userUpdated});
			}
		}

	});
}

function uploadImage(req, res){
	var userId = req.params.id;
	var file_name = 'No subido..';

	if(req.files){
		var file_path = req.files.image.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];
		console.log(file_name);
		console.log(file_ext);

		if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
			User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdated) =>{
				if(err){
					res.status(404).send({message: 'Error al actualizar el usuario'});
				}
				else{
					res.status(200).send({image: file_name,
										  user: userUpdated});
				}
			});
		}
		else{
			res.status(200).send({message: 'Extension del archivo no valida'});
		}
	}else{
		res.status(200).send({message: 'No ha subido ninguna imagen'});
	}
}

function getImageFile(req, res){
	var imageFile = req.params.imageFile;
	var path_File = './uploads/users/'+imageFile;
	fs.exists(path_File, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_File));
		}
		else{
			res.status(200).send({message: 'No existe la imagen'});
		}
	});
}

module.exports = {
	pruebas,
	saveUser,
	loginUser,
	updateUser, 
	uploadImage,
	getImageFile
};