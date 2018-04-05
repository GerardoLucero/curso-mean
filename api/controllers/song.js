'use strict'
var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var Song = require('../models/song');
const dd = require('dump-die');

function getSong(req, res){
	var songId = req.params.id;

	Song.findById(songId).populate('album').exec((err, song) =>{
		if(err){
			res.status(500).send({message: err});
		}else{
			if(!song){
				res.status(404).send({message: 'El song no existe'});
			}
			else{
				res.status(200).send({song});
			}
		}
	});
}
function getSongs(req, res){
	var albumId = req.params.album;
	if(!albumId){
		//Sacar todos los songs
		var find = Song.find({}).sort('number');
	}
	else{
		var find = Song.find({album: albumId}).sort('number');		
	}
	find.populate({path: 'album', 
					populate: {
					path: 'artist',
					model: 'Artist'
					}
				}).exec((err, songs) =>{
		if(err){
			res.status(500).send({message: err});
		}else{
			if(!songs){
			res.status(404).send({message: 'La cancion no existe'});
		}
			else{
				res.status(200).send({songs});
			}
		}
	});
}


function saveSong(req, res){
	var song = new Song();
	var params = req.body;

	song.number = params.number;
	song.name = params.name;
	song.duration = params.duration;
	song.file = 'null';
	song.album = mongoose.Types.ObjectId(params.album);
	song.save((err, songStored) =>{
		if(err){
			res.status(500).send({message: 'Error al guardar al song'});	
		}
		else{
			if(!songStored){
				res.status(404).send({message: 'La cancion no ha sido guardado'});	
			}
			else{
				res.status(200).send({song: songStored});	
			}			
		}
		
	});

}


function updateSong(req, res){
	var songId = req.params.id;
	var update = req.body;
	Song.findByIdAndUpdate(songId, update, (err, songUpdated) =>{

		if(err){
			res.status(500).send({message: 'Error en la peticion'});	
		}
		else{
			if(!songUpdated){
				res.status(404).send({message: 'La cancion no ha sido guardado'});	
			}
			else{
				res.status(200).send({song: songUpdated});	
			}			
		}
	});
}

function deleteSong(req,res){
	var songId = req.params.id;

	Song.findByIdAndRemove(songId, (err, songRemoved) =>{
		if(err){
			res.status(500).send({message: 'Error al eliminar la cancion'});	
		}
		else{
			if(!songRemoved){
				res.status(404).send({message: 'La cancion no ha sido eliminado'});	
			}
			else{
				res.status(200).send({songRemoved});	
			}
		}
	});

}

function uploadFile(req, res){

	var songId = req.params.id;
	var file_name = 'No subido...';
	if(req.files){
		var file_path = req.files.file.path;
		var file_split = file_path.split('\\');
		var file_name = file_split[2];

		var ext_split = file_name.split('\.');
		var file_ext = ext_split[1];

		if(file_ext == 'mp3' || file_ext == 'ogg' ){
			Song.findByIdAndUpdate(songId, {file: file_name}, (err, songUpdated) =>{
				if(err){
					res.status(404).send({message: 'Error al actualizar la cancion'});
				}
				else{
					res.status(200).send({song: songUpdated});
				}
			});
		}
		else{
			res.status(200).send({message: 'Extension del archivo no valida'});
		}
	}else{
		res.status(200).send({message: 'No ha subido ninguna la cancion'});
	}

}


function getSongFile(req, res){
	var file = req.params.file;
	var path_File = './uploads/songs/'+file;
	fs.exists(path_File, function(exists){
		if(exists){
			res.sendFile(path.resolve(path_File));
		}
		else{
			res.status(200).send({message: 'No existe la cancion'});
		}
	});
}
module.exports = {
	getSong,
	saveSong,
	getSongs,
	updateSong,
	deleteSong,
	uploadFile,
	getSongFile
};