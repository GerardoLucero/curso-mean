'use strinct'

var User = require('../models/user')
var bcrypt =require('bcrypt-nodejs')
const dd = require('dump-die')
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
	console.log(user);
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
	var email = params.email;
	var password = params.password;
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

module.exports = {
	pruebas,
	saveUser,
	loginUser
};