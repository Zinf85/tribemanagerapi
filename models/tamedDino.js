var db = require('../db');
var guid = require('guid');
var Promise = require('promise');
var fs = require('fs');
var queries = JSON.parse(fs.readFileSync('queries.json', 'utf8'));

exports.insert = function(request) {
  var promise = new Promise(function(resolve, reject) {
    var dino = request.dino;
    var tribeId = request.tribeId;
    var userId = request.userId;
    var values = [guid.create().value, dino.name, dino.level, dino.health,
      dino.stamina, dino.oxygen, dino.food, dino.weight,
      dino.melee, dino.speed, dino.torpor, dino.species,
      dino.gender, dino.notes, dino.imprint, dino.father,
      dino.mother, userId, tribeId
    ];

    db.get().query(queries.addTamedDino, values, function(err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('Insert successful');
      resolve(result);
    });
  });

  return promise;
}

exports.getAll = function() {
  var promise = new Promise(function(resolve, reject) {
    db.get().query(queries.getAllTamedDinos, function(err, result) {
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
      console.log('Insert successful');
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