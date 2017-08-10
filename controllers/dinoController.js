'use strict';
var tamedDino = require('../models/tamedDino');
var species = require('../models/species');
var response = require('../models/response');
var userModel = require('../models/userModel');
var requestPromise = require('request-promise');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

exports.login = function(req, res) {
  loginPromise().then(function(response) {
    console.log(response);
    res.json(response);
  });
};

exports.getTamedDinos = function(req, res) {
  getUserPromise(req.query.discordToken).then(function(userResponse) {
    console.log(userResponse);
    if (isAuthorized(userResponse)) {
      tamedDino.getAll().then(function(rsp) {
        species.getAll().then(function(speciesRsp) {
          var data = {
            dinos: rsp,
            user: getObject(userResponse),
            species: speciesRsp
          }
          res.json(data);
        }, function(err) {
          res.status(500).send({
            error: err
          });
        });
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

exports.addOrUpdateTamedDino = function(req, res) {
  getUserPromise(req.query.discordToken).then(function(userResponse) {
    if (isAuthorized(userResponse)) {
      tamedDino.addOrUpdate(req.body, getObject(userResponse)).then(function(rsp) {
        var data = {
          dinos: rsp,
          user: getObject(userResponse)
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

exports.getTamedDino = function(req, res) {
  getUserPromise(req.query.discordToken).then(function(userResponse) {
    if (isAuthorized(userResponse)) {
      tamedDino.getById(req.params.dinoId).then(function(rsp) {
        var data = {
          dinos: rsp
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

exports.updateTamedDino = function(req, res) {
  getUserPromise(req.query.discordToken).then(function(userResponse) {
    if (isAuthorized(userResponse)) {
      tamedDino.update(req.params.dinoId, req.body).then(function(rsp) {
        res.json({});
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
  getUserPromise(req.query.discordToken).then(function(userResponse) {
    if (isAuthorized(userResponse)) {
      tamedDino.delete(req.params.dinoId).then(function(rsp) {
        res.json({});
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

exports.getSpecies = function(req, res) {
  getUserPromise(req.query.discordToken).then(function(userResponse) {
    console.log(userResponse);
    if (isAuthorized(userResponse)) {
      species.getAll().then(function(rsp) {
        var data = {
          species: rsp,
          user: getObject(userResponse)
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

exports.addOrUpdateSpecies = function(req, res) {

}

function loginPromise() {
  var loginRequest = {
    method: 'GET',
    uri: config.authService.url + '/discord/login'
  }
  return requestPromise(loginRequest);
}

function getUserPromise(token) {
  var getUserRequest = {
    method: 'GET',
    uri: config.authService.url + '/discord/getUser?discordToken=' + token,
  }
  return requestPromise(getUserRequest);
}

function getObject(response) {
  if ((typeof response) === 'string') {
    return JSON.parse(response);
  }
  return response;
}

function isAuthorized(userResponse) {
  var user = JSON.parse(userResponse);
  return user.inGuild;
}