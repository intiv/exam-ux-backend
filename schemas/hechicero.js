var mongoose = require('mongoose');

var HechiceroSchema = new mongoose.Schema({
	nombre: String,
	username: String,
	ocupacion_previa: String,
	fecha: String,
	pais: String,
	creencias: String,
	amigos: [String],
	id_user: String
});

module.exports = mongoose.model('hechicero', HechiceroSchema);
