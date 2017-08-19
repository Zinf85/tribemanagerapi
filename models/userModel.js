'user strict';
var fs = require('fs');
var _ = require('underscore');

exports.createUser = function(userId, username, accessToken, inGuild){
  return {
    userId: userId,
    username: username,
    discordToken: accessToken,
    inGuild: inGuild
  }
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