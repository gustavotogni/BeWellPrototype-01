'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BiodataSchema = new Schema({

  createdOn: {
    type: Date,
    default: Date.now
  },

  binaryContent: {
    type: Buffer,
    required: true,
    contentType: String
  },
});

module.exports = mongoose.model('Biodata', BiodataSchema);