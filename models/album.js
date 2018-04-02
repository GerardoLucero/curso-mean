'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AlbumSchema = new Schema({
	name: String,
	surname: String, 
	email: String,
	password: String,
	role: String,
	image: String
});

module.exports = mongoose.model('Album', AlbumSchema);