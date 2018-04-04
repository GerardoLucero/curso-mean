'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
 var mongoose = require('mongoose');
var Artist = require('../models/artist');
var User = require('../models/user');
var Album = require('../models/album');
var Song = require('../models/song');
const dd = require('dump-die');

function getAlbum(req, res){
	var albumId = req.params.id;

	Album.findById(albumId).populate('artist').exec((err, album) =>{
		if(err){
			res.status(500).send({message: err});
		}else{
			if(!album){
				res.status(404).send({message: 'El album no existe'});
			}
			else{
				res.status(200).send({album});
			}
		}
	});
}
function getAlbums(req, res){
	var artistId = req.params.artist;
	if(!artistId){
		//Sacar todos los albums
		var find = Album.find({}).sort('title');
	}
	else{
		var find = Album.find({artist: artistId}).sort('year');		
	}
	find.populate('artist').exec((err, albums) =>{
		if(err){
			res.status(500).send({message: err});
		}else{
			if(!albums){
			res.status(404).send({message: 'El album no existe'});
		}
			else{
				res.status(200).send({albums});
			}
		}
	});
}

function saveAlbum(req, res){
	var album = new Album();
	var params = req.body;

	album.title = params.title;
	album.description = params.description;
	album.year = params.year;
	album.image = 'null';
	album.artist = mongoose.Types.ObjectId(params.artist);
	album.save((err, albumStored) =>{
		if(err){
			res.status(500).send({message: 'Error al guardar al album'});	
		}
		else{
			if(!albumStored){
				res.status(404).send({message: 'El album no ha sido guardado'});	
			}
			else{
				res.status(200).send({album: albumStored});	
			}			
		}
		
	});

}


module.exports = {
	getAlbum,
	saveAlbum,
	getAlbums
};