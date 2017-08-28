'use strict';
module.exports = function(app) {
  var dinos = require('../controllers/dinoController');
  var discord = require('../controllers/discordController');
   var generators = require('../controllers/generatorsController');

  // DINOS
  app.route('/dinos')
    .get(dinos.getTamedDinos)
    .post(dinos.addOrUpdateTamedDino);

  app.route('/dinos/:dinoId')
    .get(dinos.getTamedDino)
    .put(dinos.updateTamedDino)
    .delete(dinos.deleteTamedDino);
  //Species
    app.route('/species')
    .get(dinos.getSpecies)
    .post(dinos.addBatchSpecies);

  //GENERATORS
    app.route('/generators')
    .get(generators.getGenerators)
    .post(generators.addOrUpdateGenerator)
    .put(generators.fillGenerator);

  //DISCORD
  app.route('/discord/login')
    .get(discord.login);

  app.route('/discord/getUser')
    .get(discord.getUser)

  app.route('/discord/getGuilds')
    .get(discord.getGuilds)
  
    app.route('/discord/adminGetGuilds')
    .get(discord.adminGetGuilds)


  app.route('/discord/callback')
    .get(discord.callback);


  app.route('/discord/logout')
    .get(discord.logout);
};