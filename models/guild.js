'use strict';
var db = require('../db');
var Promise = require('promise');
var fs = require('fs');
var queries = JSON.parse(fs.readFileSync('queries.json', 'utf8')).auth;
var _ = require('underscore');

exports.insertAll = function(request) {
  var promise = new Promise(function(resolve, reject) {
    var values = [];
    values = [_.map(request, _.values)]
    db.get().query(queries.insertGuilds, values, function(err, result) {
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

exports.insertUserGuilds = function(request) {
  var promise = new Promise(function(resolve, reject) {
    var values = [];
    var guildIds = [];
    values = [request.userId]

    db.get().query(queries.getUserGuilds, values, function(err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }

      var temp = [];
      _.each(result, function(row) {
        temp.push(row.guildId);
      });

      _.each(request.guildIds, function(gId) {
        if (!_.contains(temp, gId)) {
          guildIds.push({
            userId: request.userId,
            guildId: gId
          });
        }
      });
      if (guildIds.length > 0) {
        values = [];
        values = [_.map(guildIds, _.values)];

        db.get().query(queries.insertUserGuilds, values, function(err, result2) {
          if (err) {
            console.log(err);
            reject(err);
          }
          console.log('Insert successful');
          resolve(result2);
        });
      } else {
          resolve(result);
      }
    


    });
  });

  return promise;
}