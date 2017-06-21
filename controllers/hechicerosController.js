var hechicero = require('../schemas/hechicero');
var mongoose = require('mongoose');
var boom=require('boom');

//Get all wizards
exports.getHechiceros = {
  auth: {
    mode: 'required',
    strategy: 'session',
    scope: ['hechicero']
  },
  handler: function(request, reply){
    var hechiceros = hechicero.find({});
    reply(hechiceros);
  }
}

//Get one hechicero by its id
exports.getHechiceroId = {
  auth : {
    mode: 'required',
    strategy: 'session',
    scope: ['hechicero']
  },
  handler : function(request, reply){
    hechicero.findOne({'_id' : request.params.id}, function(err, Hechicero){
      if(!err && Hechicero){
        return reply({hechicero: Hechicero, success: true});
      }else if(!err){
        return reply({message: 'Hechicero no encontrado', success: false});
      }else if(err){
        return reply({message: 'Error obteniendo hechicero', success:false});
      }
    });
  }
}

//Get one hechicero by its name
exports.getHechiceroByUser = {
  auth : {
    mode: 'required',
    strategy: 'session',
    scope: ['hechicero']
  },
  handler : function(request, reply){
    hechicero.findOne({'username' : request.params.username}, function(err, Hechiceros){
      if(!err && Hechiceros){
        return reply({hechiceros: Hechiceros, success:true});
      }else if(!err){
        return reply({message: boom.notFound(), success: false});
      }else if(err){
        return reply({message: boom.wrap(err, 'Hechiceros not found'), success: false});
      }
    });
  }
}

//modificar hechicero
exports.modifyHechicero = {
  auth : {
    mode: 'required',
    strategy: 'session',
    scope: ['hechicero']
  },
  handler: function(request, reply){
    hechicero.update(
      {'username': request.params.username},
      {$set:
        {
          nombre : request.payload.nombre,
          username : request.payload.username,
          ocupacion_previa : request.payload.ocupacion_previa,
          fecha : request.payload.fecha,
          pais : request.payload.pais,
          creencias : request.payload.creencias
        }
      }, function(err){
        if(err){
          return reply({message:boom.wrap(err, 'No se encontro el hechicero'), success: false});
        }else{
          return reply({success: true, message: 'updated succesfully'});
        }
      }
    );
  }
}

//Create a new hechicero
exports.createHechicero = {
  auth : {
    mode: 'required',
    strategy: 'session',
    scope: ['hechicero']
  },
  handler: function(request, reply){
    var newHechicero = new hechicero({
      nombre : request.payload.nombre,
      username : request.payload.username,
      ocupacion_previa : request.payload.ocupacion_previa,
      fecha : request.payload.fecha,
      pais : request.payload.pais,
      creencias : request.payload.creencias,
      amigos: [],
      id_user: request.payload.id_user
    });
    newHechicero.save(function(err){
      if(!err){
        return reply({
          success: true
        });
      }else{
        return reply({
          success: false
        })      
      }  

    });
    
  }
}



