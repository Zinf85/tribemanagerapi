'use strict';
var db = require('../db');
var Promise = require('promise');
var fs = require('fs');
var queries = JSON.parse(fs.readFileSync('queries.json', 'utf8')).auth;

exports.insert = function(request) {
  var promise = new Promise(function(resolve, reject) {
    var values = [request.user.userId, request.user.username, request.token.access_token, request.token.refresh_token];
    db.get().query(queries.insertUser, values, function(err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('Insert successful');
      resolve(result);
    });
  });
  
  return promise;
}

exports.insertOrUpdate = function(request){
  var promise = new Promise(function(resolve, reject) {
    var values = [request.user.userId, request.user.username, request.token.access_token, request.token.refresh_token,
                  request.user.username, request.token.access_token, request.token.refresh_token];
    db.get().query(queries.insertOrUpdateUser, values, function(err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('Insert successful');
      resolve(result);
    });
  });
  
  return promise;
}

exports.getTokens = function(request) {
  var promise = new Promise(function(resolve, reject) {
    var values = [request.user.userId];
    db.get().query(queries.getUserTokens, values, function(err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('Retrieval successful');
      resolve(result);
    });
  });
  
  return promise;
}

exports.updateUser = function(request) {
  var promise = new Promise(function(resolve, reject) {
    var values =[request.user.username, request.user.accessToken];
    var query = queries.updateUser;
    if(request.user.refreshToken){
      values.push(request.user.refreshToken);
      query = queries.updateUserWithRefresh;
    }
    values.push(request.user.userId);
    
    db.get().query(query, values, function(err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('Update successful');
      resolve(result);
    });
  });
}

exports.deleteTokens = function(request) {
  var promise = new Promise(function(resolve, reject) {
    var values = [request.user.userId];
    db.get().query(queries.deleteUserTokens, values, function(err, result) {
      if (err) {
        console.log(err);
        reject(err);
      }
      console.log('delete successful');
      resolve(result);
    });
  });
  return promise;
}