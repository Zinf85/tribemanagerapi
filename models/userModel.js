'user strict';
var fs = require('fs');
var _ = require('underscore');

exports.createUser = function(userId, username, accessToken, inGuild){
  return {
    userId: userId,
    username: username,
    accessToken: accessToken,
    inGuild: inGuild
  }
}