'use strict';
module.exports = function(app) {
  var dinos = require('../controllers/dinoController');
  var discord = require('../controllers/discordController');

  // dino Routes
  app.route('/dinos')
    .get(dinos.getTamedDinos)
    .post(dinos.addOrUpdateTamedDino);

  app.route('/species')
    .get(dinos.getSpecies)
    .post(dinos.addBatchSpecies);

  app.route('/dinos/:dinoId')
    .get(dinos.getTamedDino)
    .put(dinos.updateTamedDino)
    .delete(dinos.deleteTamedDino);


  //Auth routes
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