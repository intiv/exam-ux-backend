var booksController = require('./controllers/booksController');
var usersController = require('./controllers/usersController');

exports.endpoints = [
	{
		method: 'GET',
	 	path: '/books',
	 	config: booksController.getBooks
 	},
	{
		method: 'GET',
		path: '/books/searchbyid/{id}',
		config: booksController.getBookId
 	},
	{
		method: 'GET',
		path: '/books/searchbyname/{titulo}',
		config: booksController.getBookName
 	},
	{
		method: 'GET',
		path: '/books/searchbygenre/{genero}',
		config: booksController.getBookGenre
 	},
	{
		method: 'GET',
		path: '/books/searchbyauthor/{autor}',
		config: booksController.getBookAuthor
 	},
	{
		method: 'GET',
		path: '/books/searchbykey', //FALTA HACER EJEMPLO POSTMAN
		config: booksController.getBookKey
 	},
	{
		method: 'GET',
		path: '/books/borrowed',
		config: booksController.getBookPrestado
 	},
 	{	
		method: 'PUT',
		path: '/books/update/{id}',
		config: booksController.modifyBook

 	},
	{
		method: 'PUT',
		path: '/books/borrowbook/{id}',
		config: booksController.putBookPrestado
 	},
	{
		method: 'DELETE',
		path: '/books/delete/{id}',
		config: booksController.deleteBook
 	},
	{
		method: 'POST',
		path: '/books/create',
		config: booksController.createBook
 	},
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
 	}
];
