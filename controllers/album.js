'use strict'
var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var User = require('../models/user');
var Album = require('../models/album');
var Song = require('../models/song');
const dd = require('dump-die');

function getAlbum(req, res){
	var albumId = req.params.id;

	Album.findById(albumId, (err, album) =>{
		if(err){
			res.status(500).send({message: 'Error en la petición'});
		}
		else{
			if(!album){
				res.status(404).send({message: 'El album no existe'});
			}
			else{
				res.status(200).send({album});	
			}
		}
	});
	
}