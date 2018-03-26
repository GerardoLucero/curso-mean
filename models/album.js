'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = Schema({
	name: String,
	surname: String, 
	email: String,
	password: String,
	role: String,
	image: String
});

mongoose.exports = mongoose.model('Album', AlbumSchema);