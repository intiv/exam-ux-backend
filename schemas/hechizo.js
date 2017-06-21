var mongoose = require('mongoose');

var HechizoSchema = new mongoose.Schema({
	nombre: String,
	dificultad: String,
	tiempo: Number,
	id_hechicero: String
});

module.exports = mongoose.model('hechizo', HechizoSchema);