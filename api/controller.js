'use strict';

var mongoose = require('mongoose');
var Biodata = mongoose.model('Biodata');
const fs = require('fs');

exports.list_all_tasks = function(req, res) {

  Biodata.find({}, function(err, task) {    
    if (err) {
      res.send(err);
    }
    
    res.json(task);    
    
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    console.info('get @ %s', time)
  });
};




exports.create_a_task = function(req, res) {

  console.log("Request size: " + req.stats.bytesRead)
  console.log(req.body)
    var new_task = new Biodata();

  new_task.binaryContent = req.body;

  new_task.save(function(err, task) {    
    if (err) {
      res.send(err);
    }

    res.json(task);
  });
};


exports.read_a_task = function(req, res) {

  console.log("Reading Biodata ID " + req.params.objectId)
  
  Biodata.findById(req.params.objectId, function(err, task) { 

    if (err) {
      res.send(err);
    }
    
    res.json(task);
  });
};

exports.delete_a_task = function(req, res) {

  Biodata.remove({
    //_id: req.params.ObjectId
  }, function(err, task) {
    if (err) {
      res.send(err);
    }

    res.json({ message: 'Biodata successfully deleted' });
  });
};

