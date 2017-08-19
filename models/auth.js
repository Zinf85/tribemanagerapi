'use strict';
var discord = require('../models/discordModel');
var requestPromise = require('request-promise');
var btoa = require('btoa');
var response = require('../models/response');
var userModel = require('../models/userModel');
var fs = require('fs');
var _ = require('underscore');
var queries = JSON.parse(fs.readFileSync('queries.json', 'utf8'));
var config = JSON.parse(fs.readFileSync('config.json'));
var guild = require('../models/guild');
var helpers = require('../utils/helpers');


module.exports = {
  getObject: function(obj) {
    if ((typeof obj) === 'string') {
      obj = JSON.parse(obj);
    }
    return obj;
  },

  getUserGuildsRequest: function(userId, response) {
    var request = {};
    var guildIds = [];
    var guilds = helpers.getObject(response);
    _.each(guilds, function(guild) {
      guildIds.push(guild.id);
    });
    request.userId = userId;
    request.guildIds = guildIds;
    return request;
  },

  getGuildsRequest: function(response) {
    var guilds = helpers.getObject(response);
    var guildsRequest = [];

    _.each(guilds, function(guild) {
      var g = {
        guildId: guild.id,
        guildName: guild.name
      }
      guildsRequest.push(g);
    });
    return guildsRequest;
  },

  getTokenPromise: function(req) {
    const code = req.query.code;
    const creds = btoa(`${config.discord.clientId}:${config.discord.clientSecret}`);
    var redirect = encodeURIComponent(config.discord.callbackURL);
    var tokenOptions = {
      method: 'POST',
      uri: 'https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=' + code + '&redirect_uri=' + redirect,
      headers: {
        Authorization: `Basic ${creds}`,
      },
      json: true // Automatically stringifies the body to JSON 
    };

    return requestPromise(tokenOptions);
  },

  getUserPromise: function(accessToken) {
    var getUserRequest = {
      method: 'GET',
      uri: 'http://discordapp.com/api/users/@me',
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }
    return requestPromise(getUserRequest);
  },

  getGuildsPromise: function(accessToken) {
    var getGuildsRequest = {
      method: 'GET',
      uri: 'http://discordapp.com/api/users/@me/guilds',
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    }
    
    return requestPromise(getGuildsRequest);
  }
}