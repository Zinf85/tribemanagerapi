var db = require('../db');
var guid = require('guid');
var Promise = require('promise');
var fs = require('fs');
var queries = JSON.parse(fs.readFileSync('queries.json', 'utf8')).generators;
var _ = require('underscore');
var moment = require('moment');

exports.addOrUpdate = function(request) {
  var promise = new Promise(function(resolve, reject) {

    var generator = request.generator;
    var tribeId = request.tribeId;
    var userId = request.user.userId;
    var generatorId = generator.id ? generator.id : guid.create().value;
    var filledOn = getFillDate();



    var values = [generatorId, generator.name, generator.server, generator.count, userId, filledOn, generator.name, generator.server, generator.count];

    db.get().query(queries.addOrUpdateGenerator, values, function(err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('Insert or update successful');
      db.get().query(queries.getGeneratorById, [generatorId], function(err2, result2) {
        if (err2) {
          console.log(err2);
          reject(err2);
        }
        console.log(result2);
        resolve(result2);

      });

    });
  });

  return promise;
}

exports.getAll = function() {
  var promise = new Promise(function(resolve, reject) {
    db.get().query(queries.getAllGenerators, function(err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('Retrieval successful');
      resolve(result);
    });
  });

  return promise;

}

exports.fillGenerator = function(request) {
  var promise = new Promise(function(resolve, reject) {
    var generator = request.generator;
    var tribeId = request.tribeId;
    var userId = request.user.userId;
    var filledOn = getFillDate();


    if (!generator || !generator.id) {
      reject('No generator or Id')
    } else {
      var values = [userId, filledOn, generator.id];

      db.get().query(queries.fillGenerator, values, function(err, result) {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log('Insert or update successful');
        db.get().query(queries.getGeneratorById, [generator.id], function(err2, result2) {
          if (err2) {
            console.log(err2);
            reject(err2);
          }
          console.log(result2);
          resolve(result2);

        });

      });
    }

  });

  return promise;
}

function getFillDate() {
  console.log('filldate');
  var localDate = new Date();
  var localMoment = moment();
  var utcMoment = moment.utc().format("YYYY-MM-DD HH:mm:ss");
  console.log(utcMoment);
  return utcMoment;
}