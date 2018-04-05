'use strict'

  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;
  var Album = require('../models/album');

var SongSchema = new Schema({
	number: String,
	name: String, 
	duration: String,
	file: String,
	album: [{type: Schema.Types.ObjectId, ref: 'Album'}]

});

module.exports = mongoose.model('Song', SongSchema);