'user strict';
var fs = require('fs');
var _ = require('underscore');
var db = require('../db');
var Promise = require('promise');
var queries = JSON.parse(fs.readFileSync('queries.json', 'utf8')).auth;

exports.createUser = function(userId, username, accessToken, inGuild) {
  return {
    userId: userId,
    username: username,
    discordToken: accessToken,
    inGuild: inGuild,
    isSuperUser: false
  }
}

exports.getUser = function(request) {
  var promise = new Promise(function(resolve, reject) {
    var id = request.user.userId ? request.user.userId : request.user.id;
    if (id) {
      var values = [id];
      db.get().query(queries.getUser, values, function(err, result) {
        if (err) {
          console.log(err);
          reject(err);
        }
        console.log("USER")
        console.log(result);
        console.log('Retrieval successful');
        resolve(result);
      });
    } else {
      reject('no id');
    }

  });

  return promise;
}

exports.isInGuild = function(guildsResponse) {
  var userIn = false;
  var guilds = JSON.parse(fs.readFileSync('config.json', 'utf8')).discord.guilds;
  var guildsResponseObj = JSON.parse(guildsResponse);
  _.each(guildsResponseObj, function(responseGuild) {
    _.each(guilds, function(guild) {
      //Id's of the discords the user needs to belong to to have access to app
      if (responseGuild.id === guild.id || responseGuild.id === guild.id) {
        userIn = true;
      }
    });


  });

  return userIn;
}