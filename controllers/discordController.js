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
var tribeModel = require('../models/tribeModel');
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
              setTimeout(function() {
                res.redirect(config.tribeManagerApp.url + "?discordToken=" + user.discordToken);
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
        var userRspObj = JSON.parse(userRsp);
        guild.insertAll(auth.getGuildsRequest(guildRsp)).then(function(guildsRsp) {
          guild.insertUserGuilds(auth.getUserGuildsRequest(userRspObj.id, guildRsp)).then(function(userGuildsRsp) {
            var user = userModel.createUser(userRspObj.id, userRspObj.username,
              token, userModel.isInGuild(guildRsp));
            var userReq = {
              user: user
            }
            userModel.getUser(userReq).then(function(dbUserRsp) {
              if (dbUserRsp.length == 1) {
                user.isSuperUser = dbUserRsp[0].isSuperUser == 1;
                user.tribeId = dbUserRsp[0].tribeId;
                user.tribeName = dbUserRsp[0].tribeName;
              }
              
              tribeModel.getTribes().then(function(tribeRsp){
                 var data = {
                user: user,
                tribes: tribeRsp
              }
              res.json(data);
              }, function(err){
                 res.status(500).send({
                error: "Failed to get tribes."
              });
              });
             
            }, function(err) {
              res.status(500).send({
                error: 'Failed lookup'
              });
            });

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

exports.adminGetGuilds = function(req, res) {
  var token = req.query.discordToken;
  setTimeout(function(){
     auth.getGuildsPromise(req.query.discordToken).then(function(guildRsp) {
    if (isAuthorized(guildRsp)) {
      setTimeout(function() {
        auth.getUserPromise(token).then(function(userRsp) {
          var request = {
            user: JSON.parse(userRsp)
          }
          guild.adminGetGuilds(request).then(function(usersGuildsRsp) {
            res.json(usersGuildsRsp);
          }, function(err) {
            res.status(err.statusCode);
            res.send('error getting guilds');
          })
        }, function(err) {
          res.status(err.statusCode);
          res.send('error getting guilds');
        })
      }, rateDelay)

    }
  }, function(err) {
    res.status(err.statusCode);
    res.send('error getting users guilds');
  });
  }, rateDelay);
 
}

function isAuthorized(guildRsp) {
  return userModel.isInGuild(guildRsp);
}