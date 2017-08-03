'use strict';
var tamedDino = require('../models/tamedDino');
var response = require('../models/response');
var userModel = require('../models/userModel');
var requestPromise = require('request-promise');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

exports.getTamedDinos = function(req, res) {
  getUserPromise(req.cookies.discordToken).then(function(userResponse) {
    if (isAuthorized(userResponse)) {
      tamedDino.getAll().then(function(rsp) {
        var data = {
          dinos: rsp
        }
        res.json(response.createResponse(data, true, 'success'));
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

exports.addTamedDino = function(req, res) {
  getUserPromise(req.cookies.discordToken).then(function(userResponse) {
    if (isAuthorized(userResponse)) {
      tamedDino.insert(req.body).then(function(rsp) {
        res.json(response.createResponse({}, true, 'success'));
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

exports.getTamedDino = function(req, res) {
  getUserPromise(req.cookies.discordToken).then(function(userResponse) {
    if (isAuthorized(userResponse)) {
      tamedDino.getById(req.params.dinoId).then(function(rsp) {
        var data = {
          dinos: rsp
        }
        res.json(response.createResponse(data, true, 'success'));
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

exports.updateTamedDino = function(req, res) {
  getUserPromise(req.cookies.discordToken).then(function(userResponse) {
    if (isAuthorized(userResponse)) {
      tamedDino.update(req.params.dinoId, req.body).then(function(rsp) {
        res.json(response.createResponse({}, true, 'success'));
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

exports.deleteTamedDino = function(req, res) {
  getUserPromise(req.cookies.discordToken).then(function(userResponse) {
    if (isAuthorized(userResponse)) {
      tamedDino.delete(req.params.dinoId).then(function(rsp) {
        res.json(response.createResponse({}, true, 'success'));
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

function getUserPromise(token) {
  var getUserRequest = {
    method: 'GET',
    uri: config.authService.url + '/discord/getUser?discordToken=' + token ,
  }
  return requestPromise(getUserRequest);
}

function isAuthorized(userResponse) {
  var user = JSON.parse(userResponse).data;
  return user.inGuild;
}