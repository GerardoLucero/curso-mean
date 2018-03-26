'use strict'
var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 8080;

var dbURI = 'mongodb://localhost:27017/Curso';

mongoose.connect(dbURI, (err, res) => {
	if(err){
		throw err;
	}else{
		console.log("La base de datos esta corriendo correctamente..");
		
		app.listen(port, function(){
			console.log("Servidor corriendo");

		});
	}
});

