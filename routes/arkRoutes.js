'use strict';
module.exports = function(app) {
  var dinos = require('../controllers/dinoController');
  var auth = require('../controllers/authController')

  // todoList Routes
  app.route('/dinos')
    .get(dinos.getTamedDinos)
    .post(dinos.addTamedDino);


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