'use strict'

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

var SongSchema = new Schema({
	name: String,
	description: String, 
	image: String
});

module.exports = mongoose.model('Song', SongSchema);