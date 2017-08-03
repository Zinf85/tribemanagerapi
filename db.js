var mysql = require('mysql'),
   async = require('async');
var fs = require('fs');
var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var conn = null;

exports.connect = function(mode, done) {
  conn = mysql.createConnection({
    host: config.tribemanager.host,
    user: config.tribemanager.user,
    password: config.tribemanager.password,
    database: config.tribemanager.database
  });
 
  conn.connect(function(err){
    if(err){
      throw err;
    }
    console.log("Database connected...")
  });
  done();
}

exports.get = function() {
  return conn;
}

exports.buildInsert = function(table, object){
  
}