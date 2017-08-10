'use strict';
module.exports = function(app) {
  var dinos = require('../controllers/dinoController');

  // todoList Routes
  app.route('/dinos')
    .get(dinos.getTamedDinos)
    .post(dinos.addOrUpdateTamedDino);
  
  app.route('/species')
    .get(dinos.getSpecies)
    .post(dinos.addOrUpdateSpecies);

  app.route('/dinos/login')
  .get(dinos.login);
  
  app.route('/dinos/:dinoId')
    .get(dinos.getTamedDino)
    .put(dinos.updateTamedDino)
    .delete(dinos.deleteTamedDino);
  
//   app.route('/discord/callback')
//   .get(auth.callback);
  
//   app.route('/discord/login')
//   .get(auth.login);
  
//   app.route('/discord/logout')
//   .post(auth.logout);
};