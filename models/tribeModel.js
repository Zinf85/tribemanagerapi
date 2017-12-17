'user strict';
var fs = require('fs');
var _ = require('underscore');
var db = require('../db');
var Promise = require('promise');
var queries = JSON.parse(fs.readFileSync('queries.json', 'utf8')).auth;

exports.getTribes = function() {
  var promise = new Promise(function(resolve, reject) {
    console.log(queries.getTribes);
    db.get().query(queries.getTribes, function(err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log(result);
      console.log('Retrieval successful');
      resolve(result);
    });
  });

  return promise;
}

exports.updateUserTribe = function(request) {
  var promise = new Promise(function(resolve, reject) {
    var id = request.user.userId ? request.user.userId : request.user.id;
    if (id) {
      var values = [request.tribeId, id];
      db.get().query(queries.updateUserTribe, values, function(err, result) {
        if (err) {
          console.log(err);
          reject(err);
        }
        db.get().query(queries.addToUserTribes, values, function(err2, result2) {
          if (err2) {
            console.log(err2);
            reject(err2);
          }
          db.get().query(queries.getUserTribe, [id], function(err3, result3){
                  console.log('Retrieval successful');
          resolve(result3);
          });
    
        });

      });
    } else {
      reject('no id');
    }

  });

  return promise;
}