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
var auth = require('../models/auth');
var helpers = require('../utils/helpers');
var rateDelay = 750;



exports.login = function(req, res) {
  var redirect = encodeURIComponent(config.discord.callbackURL);
  //res.redirect('https://discordapp.com/oauth2/authorize?client_id=' + config.discord.clientId + '&scope=identify%20guilds&response_type=code&redirect_uri=' + redirect);
  res.json('https://discordapp.com/oauth2/authorize?client_id=' + config.discord.clientId + '&scope=identify%20guilds&response_type=code&redirect_uri=' + redirect);
}

exports.logout = function(req, res) {
  discord.logout(req.body).then(function(rsp) {
    res.json(response.createResponse("logged out", true, 'success'));
  }, function(err) {
    res.status(500).send({
      error: err
    })
  });
}

exports.callback = function(req, res) {
  auth.getTokenPromise(req).then(function(tokenResponse) {
    auth.getUserPromise(tokenResponse.access_token).then(function(getUserResponse) {
      var getUserResponseObj = JSON.parse(getUserResponse);
      setTimeout(function() {
        auth.getGuildsPromise(tokenResponse.access_token).then(function(getGuildsResponse) {
          var user = userModel.createUser(getUserResponseObj.id, getUserResponseObj.username,
            tokenResponse.access_token, userModel.isInGuild(getGuildsResponse));
          var insertRequest = {
            user: user,
            token: tokenResponse
          }
          discord.insertOrUpdate(insertRequest).then(function(rsp) {
            var guildsRequest = auth.getGuildsRequest(getGuildsResponse);
            guild.insertAll(guildsRequest).then(function(guildsRsp) {
              setTimeout(function(){
                 res.redirect("https://nathanwmarsh.com/ark/tribemanagerdev/?discordToken=" + user.discordToken);
              }, rateDelay);
             
            }, function(err) {
              res.status(500).send({
                error: 'Failed insert'
              });
            });

            // res.json(response.createResponse(user, true, 'success'));
          }, function(err) {
            res.status(500).send({
              error: 'Failed insert'
            });
          });
        }, function(err) {
          res.status(500).send({
            error: 'Failed to get guilds'
          });
        });
      }, rateDelay);

    });
  }, function(err) {
    console.log(err);
  });
}

exports.getGuilds = function(req, res) {

}

exports.getUser = function(req, res) {
  var token = req.query.discordToken;
  auth.getGuildsPromise(token).then(function(guildRsp) {
    setTimeout(function() {
      auth.getUserPromise(token).then(function(userRsp) {
        console.log(userRsp);
        var userRspObj = JSON.parse(userRsp);
        guild.insertAll(auth.getGuildsRequest(guildRsp)).then(function(guildsRsp) {
          guild.insertUserGuilds(auth.getUserGuildsRequest(userRspObj.id, guildRsp)).then(function(userGuildsRsp) {
            var user = userModel.createUser(userRspObj.id, userRspObj.username,
              token, userModel.isInGuild(guildRsp));
            res.json(user);
          }, function(err) {
            res.status(500).send({
              error: 'Failed insert'
            });
          });


        }, function(err) {
          res.status(500).send({
            error: 'Failed insert'
          });
        });



      }, function(err) {
        res.status(err.statusCode);
        res.send('error getting user');
      });
    }, rateDelay);

  }, function(err) {
    res.status(err.statusCode);
    res.send('error getting guilds');
  });

}