'use strict';
var tamedDino = require('../models/tamedDino');
var species = require('../models/species');
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

exports.getTamedDinos = function(req, res) {
  auth.getGuildsPromise(req.query.discordToken).then(function(guildRsp) {
    if (isAuthorized(guildRsp)) {
      tamedDino.getAll().then(function(rsp) {
        species.getAll().then(function(speciesRsp) {
          var data = {
            dinos: rsp,
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
  auth.getGuildsPromise(req.query.discordToken).then(function(guildRsp) {
    if (isAuthorized(guildRsp)) {
      tamedDino.addOrUpdate(req.body).then(function(rsp) {
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

exports.getTamedDino = function(req, res) {
  auth.getGuildsPromise(req.query.discordToken).then(function(guildRsp) {
    if (isAuthorized(guildRsp)) {
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
  auth.getGuildsPromise(req.query.discordToken).then(function(guildRsp) {
    if (isAuthorized(guildRsp)) {
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
  auth.getGuildsPromise(req.query.discordToken).then(function(guildRsp) {
    if (isAuthorized(guildRsp)) {
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

exports.addSpecies = function(req, res) {
  auth.getGuildsPromise(req.query.discordToken).then(function(guildRsp) {
    if (isAuthorized(guildRsp)) {
      var request = {
        species: req.body.species
      }
      species.addSpecies(request).then(function(rsp) {
          res.json(rsp);
      }, function(err) {
        res.status(500).send({
          error: err
        });
      });
    } else {
       res.redirect(config.tribeManagerApp.url + '/login');
    }
  }, function(err) {
    res.status(500).send({
      error: err
    });
  });
}

exports.getSpecies = function(req, res) {
  auth.getUserPromise(req.query.discordToken).then(function(userResponse) {
    console.log(userResponse);
    if (isAuthorized(userResponse)) {
      species.getAll().then(function(rsp) {
        var data = {
          species: rsp,
          user: helpers.getObject(userResponse)
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


function isAuthorized(guildRsp) {
  return userModel.isInGuild(guildRsp);
}