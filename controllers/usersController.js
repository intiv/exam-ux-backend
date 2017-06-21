var user = require('../schemas/user');
var SHA3 = require('crypto-js/sha3');
var boom = require('boom');
var joi = require('joi');

exports.createUser = {
	auth : false,
	handler : function(request, reply){
		var newUser = new user({
			username : request.payload.username,
			password : SHA3(request.payload.password),
			scope : request.payload.scope
		});
		newUser.save(function(err){
			if(err){
				return reply({success: false});
			}else{
				return reply({success: true});
			}
		});
	}
}

exports.login = {
  auth: false,
  handler: function(request, reply) {
    var password = String(SHA3(request.payload.password));
    user.find({username: request.payload.username, password: password}, function(err, User){
      if(!err && User){
        if(User.length > 0){
          request.cookieAuth.set(User[0]);
          return reply({username: User[0].username, scope: User[0].scope, success: true, message: 'Login hecho exitosamente'});
        }else{
          return reply({success: false, message: 'No se obtuvo ningun usuario'});
        }
      }else if(!err){
        return reply({success: false, message: 'No se encontro el usuario'});
      }else if(err){
      	return reply({success: false, message: 'Error obteniendo de la BD'});
      }
    });
  }
};

exports.logout = {
  auth : {
    strategy: 'session',
    mode: 'required'
  },
  handler: function(request, reply) {
    request.cookieAuth.clear();
    return reply('Logout Successful!');
  }
};