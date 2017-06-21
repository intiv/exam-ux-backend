var hechicerosController = require('./controllers/hechicerosController');
var hechizosController = require('./controllers/hechizosController');
var usersController = require('./controllers/usersController');

exports.endpoints = [
	//auth
	{
		method: 'POST',
		path: '/register',
		config: usersController.createUser
	},
	{
		method: 'POST',
		path: '/login',
		config: usersController.login
	},
	{
		method: 'PUT',
		path: '/logout',
		config: usersController.logout
	},
	//hechiceros
	{
		method: 'GET',
	 	path: '/hechiceros',
	 	config: hechicerosController.getHechiceros
 	},
	{
		method: 'GET',
		path: '/hechiceros/buscar/id/{id}',
		config: hechicerosController.getHechiceroId
 	},
	{
		method: 'GET',
		path: '/hechiceros/buscar/username/{username}',
		config: hechicerosController.getHechiceroByUser
 	},
 	{
 		method: 'PUT',
 		path: '/hechiceros/modificar/{username}',
 		config: hechicerosController.modifyHechicero
 	},
 	{
 		method: 'POST',
 		path: '/hechiceros/crear',
 		config: hechicerosController.createHechicero
 	},
 	//hechizos
 	
 	{
 		method: 'POST',
 		path: '/hechizos/crear',
 		config: hechizosController.createHechizo
 	},
 	{
 		method: 'GET',
 		path: '/hechizos',
 		config: hechizosController.getHechizos
 	},
 	{
 		method: 'GET',
 		path: '/hechizos/{id}',
 		config: hechizosController.getHechizoId
 	},
 	{
 		method: 'GET',
 		path: '/hechizos/buscar/hechicero/{id}',
 		config: hechizosController.getHechizosByHechicero
 	},
 	{
 		method: 'PUT',
 		path: '/hechizos/modificar/{id}',
 		config: hechizosController.modifyHechizo
 	}

];
