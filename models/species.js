var db = require('../db');
var guid = require('guid');
var Promise = require('promise');
var fs = require('fs');
var queries = JSON.parse(fs.readFileSync('queries.json', 'utf8')).species;
var _ = require('underscore');

exports.addSpecies= function(request, user) {
  var promise = new Promise(function(resolve, reject) {
    var species = request.species;
    var values = [species.name, species.type];

    db.get().query(queries.addSpecies, values, function(err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);

    });
  });

  return promise;
}

exports.addBatchSpecies= function(request, user) {
  var promise = new Promise(function(resolve, reject) {
    var species = request.species;
    var temp = [];
    species.forEach(function(spec){
      var val = [spec.name, spec.type];
      temp.push(val);
    });
   // var values = [species.name, species.type];
console.log(temp);
    db.get().query(queries.addBatchSpecies, [temp], function(err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(result);

    });
  });

  return promise;
}

exports.getAll = function() {
  var promise = new Promise(function(resolve, reject) {
    db.get().query(queries.getAllSpecies, function(err, result) {
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
      db.get().query("SELECT * From Species WHERE id = '" + id + "'", function(err, result) {
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
//   var promise = new Promise(function(resolve, reject) {
//     var dino = request.dino;
//     var tribeId = request.tribeId;
//     var userId = request.user.userId;
//     var values = [dino.name, dino.level, dino.health,
//       dino.stamina, dino.oxygen, dino.food, dino.weight,
//       dino.melee, dino.speed, dino.torpor, dino.species,
//       dino.gender, dino.notes, dino.imprint, dino.father,
//       dino.mother, userId, tribeId, id
//     ];

//     db.get().query(queries.updateTamedDino, values, function(err, result) {
//       if (err) {
//         console.log(err);
//         reject(err);
//       }
//       console.log('Update successful');
//       resolve(result);
//     });
//   });

//   return promise;
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