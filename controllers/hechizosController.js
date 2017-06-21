var hechizo=require('../schemas/hechizo');
var mongoose=require('mongoose');
var boom = require('boom');

exports.getHechizos = {
  auth: false,
  handler: function(request, reply){
    var hechizos = hechizo.find({});
    reply(hechizos);
  }
}

//Get one Hechizo by its id
exports.getHechizoId = {
  auth : false,
  handler : function(request, reply){
    hechizo.findOne({'_id' : request.params.id}, function(err, Hechizo){
      if(!err && Hechizo){
        return reply({hechizo: Hechizo, success: true});
      }else if(!err){
        return reply({message: 'Hechizo no encontrado', success: false});
      }else if(err){
        return reply({message: 'Error obteniendo Hechizo', success:false});
      }
    });
  }
}

//Get one Hechizo by its name
exports.getHechizosByHechicero = {
  auth : false,
  handler : function(request, reply){
    Hechizo.findOne({'id_hechicero' : request.params.id}, function(err, Hechizos){
      if(!err && Hechizos){
        return reply({Hechizos: Hechizos, success:true});
      }else if(!err){
        return reply({message: boom.notFound(), success: false});
      }else if(err){
        return reply({message: boom.wrap(err, 'Hechizos not found'), success: false});
      }
    });
  }
}

//modificar Hechizo
exports.modifyHechizo = {
  auth : false,
  handler: function(request, reply){
    hechizo.update(
      {'_id': request.params.id},
      {$set:
        {
          nombre : request.payload.nombre,
          dificultad: request.payload.dificultad,
          tiempo: request.payload.tiempo
        }
      }, function(err){
        if(err){
          return reply({message:boom.wrap(err, 'No se encontro el Hechizo'), success: false});
        }else{
          return reply({success: true, message: 'updated succesfully'});
        }
      }
    );
  }
}

//Create a new Hechizo
exports.createHechizo = {
  auth : false,
  handler: function(request, reply){
    var newHechizo = new hechizo({
      nombre : request.payload.nombre,
      dificultad : request.payload.dificultad,
      tiempo : request.payload.tiempo,
      id_hechicero: request.payload.id_hechicero      
    });
    newHechizo.save(function(err){
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
