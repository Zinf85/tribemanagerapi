'use strict';

exports.createResponse = function(data, success, message){
  var object = {
    status: success ? 'success' :"failed",
    reason: message,
    data: data
  }
  
  return object;
}

exports.error = function(err, res){
  res.status(err.statusCode).send({
      statusCode: err.statusCode,
      error: err.message
    });
}