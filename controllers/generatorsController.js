'use strict';
var generator = require('../models/generator');
var response = require('../models/response');
var userModel = require('../models/userModel');
var requestPromise = require('request-promise');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var helpers = require('../utils/helpers');
var auth = require('../models/auth');

// exports.login = function(req, res) {
//   loginPromise().then(function(response) {
//     console.log(response);
//     res.json(response);
//   });
// };

exports.getGenerators = function(req, res) {
  auth.getGuildsPromise(req.query.discordToken).then(function(guildRsp) {
    if (isAuthorized(guildRsp)) {
      generator.getAll().then(function(rsp) {
        var data = {
          generators: rsp,
        }
        res.json(data);
      }, function(err) {
        res.status(500).send({
          error: err
        });
      });
    } else {
      //not in guild
      res.redirect('/tribemanager/login');
    }
  }, function(err) {
    response.error(err, res);
  });

}

exports.addOrUpdateGenerator = function(req, res) {
  auth.getGuildsPromise(req.query.discordToken).then(function(guildRsp) {
    if (isAuthorized(guildRsp)) {
      console.log(req.body);
      generator.addOrUpdate(req.body).then(function(rsp) {
        var data = {
          generators: rsp
        }
        res.json(data);
      }, function(err) {
        res.status(500).send({
          error: err
        })
      });
    }
  }, function(err) {
    response.error(err, res);
  });

}

exports.fillGenerator = function(req, res) {
  auth.getGuildsPromise(req.query.discordToken).then(function(guildRsp) {
    if (isAuthorized(guildRsp)) {
      console.log(req.body);
      generator.fillGenerator(req.body).then(function(rsp) {
        var data = {
          generators: rsp
        }
        res.json(data);
      }, function(err) {
        res.status(500).send({
          error: err
        })
      });
    }
  }, function(err) {
    response.error(err, res);
  });

}

function isAuthorized(guildRsp) {
  return userModel.isInGuild(guildRsp);
}