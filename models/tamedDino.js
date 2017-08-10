var db = require('../db');
var guid = require('guid');
var Promise = require('promise');
var fs = require('fs');
var queries = JSON.parse(fs.readFileSync('queries.json', 'utf8'));
var _ = require('underscore');

exports.addOrUpdate = function(request, user) {
  var promise = new Promise(function(resolve, reject) {
    var dino = request.dino;
    var tribeId = request.tribeId;
    var userId = user.userId;
    var dinoId = dino.id ? dino.id : guid.create().value;
    var values = [dinoId, dino.name, dino.level, dino.health,
      dino.stamina, dino.oxygen, dino.food, dino.weight,
      dino.melee, dino.speed, dino.torpor, dino.species,
      dino.gender, dino.notes, dino.imprint, dino.father,
      dino.mother, userId, tribeId, dino.status,
      dino.name, dino.level, dino.health,
      dino.stamina, dino.oxygen, dino.food, dino.weight,
      dino.melee, dino.speed, dino.torpor, dino.species,
      dino.gender, dino.notes, dino.imprint, dino.father,
      dino.mother, userId, tribeId, dino.status
    ];

    db.get().query(queries.addOrUpdateTamedDino, values, function(err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('Insert or update successful');
      db.get().query(queries.getDinoById, [dinoId], function(err2, result2) {
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
    db.get().query(queries.getAllTamedDinos, function(err, result) {
      //    db.get().query(queries.getUsersJoinTamedDinos, function(joinErr, joinRes) {
      //         result.forEach(function(row){
      //           var user = _.findWhere(joinRes, {userId: row.addedby.toString()});

      //           if(user){
      //             row.addedby = user.username;
      //           }
      //         });
      //       });
      console.log(result);
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('Retrieval successful');
      console.log(result);
      resolve(result);
    });
  });

  return promise;

}

exports.getById = function(id) {
  var promise = new Promise(function(resolve, reject) {
    if (id) {
      db.get().query("SELECT * From TamedDinos WHERE id = '" + id + "'", function(err, result) {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log('Retrieval successful');
        resolve(result);
      });
    } else {
      reject('No id');
    }

  });

  return promise;
}

exports.getByUser = function(userId) {

}

exports.getByTribe = function(tribeId) {

}

exports.update = function(id, request) {
  var promise = new Promise(function(resolve, reject) {
    var dino = request.dino;
    var tribeId = request.tribeId;
    var userId = request.user.userId;
    var values = [dino.name, dino.level, dino.health,
      dino.stamina, dino.oxygen, dino.food, dino.weight,
      dino.melee, dino.speed, dino.torpor, dino.species,
      dino.gender, dino.notes, dino.imprint, dino.father,
      dino.mother, userId, tribeId, id
    ];

    db.get().query(queries.updateTamedDino, values, function(err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('Update successful');
      resolve(result);
    });
  });

  return promise;
}

exports.delete = function(id) {
  var promise = new Promise(function(resolve, reject) {
    if (id) {
      db.get().query("DELETE FROM TamedDinos WHERE id = '" + id + "'", function(err, result) {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log('Delete successful');
        resolve(result);
      });
    } else {
      reject("No id");
    }

  });

  return promise;
}