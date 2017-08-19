'use strict';
var db = require('../db');
var Promise = require('promise');
var fs = require('fs');
var queries = JSON.parse(fs.readFileSync('queries.json', 'utf8')).auth;
var _ = require('underscore');
var userModel = require('./userModel');

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

exports.adminGetGuilds = function(request) {
  var promise = new Promise(function(resolve, reject) {
    userModel.getUser(request).then(function(rsp) {
      if (rsp.length === 1 && rsp[0].isSuperUser) {
          db.get().query(queries.adminGetUsersGuilds, function(err, result) {

               if(err){
                 reject(err);
               }
            resolve(result);
          });
      } else {
        reject('something went wrong');
      }
    }, function(err){
      reject(err);
    });
  });
  return promise;
}