var book = require('../schemas/book');
var mongoose = require('mongoose');
var boom=require('boom');

//Get all books
exports.getBooks = {
  auth: false,
  handler: function(request, reply){
    var books = book.find({});
    reply(books);
  }
}

//Get one book by its id
exports.getBookId = {
  auth : {
    mode: 'required',
    strategy: 'session',
    scope: ['librarian','student']
  },
  handler : function(request, reply){
    book.findOne({'_id' : request.params.id}, function(err, Book){
      if(!err && Book){
        return reply({libro: Book, success: true});
      }else if(!err){
        return reply({message: 'Libro no encontrado', success: false});
      }else if(err){
        return reply({message: 'Error obteniendo libro', success:false});
      }
    });
  }
}

//Get one book by its name
exports.getBookName = {
  auth : {
    mode: 'required',
    strategy: 'session',
    scope: ['librarian','student']
  },
  handler : function(request, reply){
    book.find({'titulo' : request.params.titulo}, function(err, Books){
      if(!err && Books){
        return reply({libros: Books, success:true});
      }else if(!err){
        return reply({message: boom.notFound(), success: false});
      }else if(err){
        return reply({message: boom.wrap(err, 'Books not found'), success: false});
      }
    });
  }
}

//Get one book by its genere
exports.getBookGenre = {
  auth : {
    mode: 'required',
    strategy: 'session',
    scope: ['librarian','student']
  },
  handler : function(request, reply){
    book.find({genero : request.params.genero}, function(err, Books){
      if(!err && Books){
        return reply({libros: Books, success:true});
      }else if(!err){
        return reply({success: false});
      }else if(err){
        return reply({message: err,success: false});
      }
    });
  }
}

//Get one book by its Author
exports.getBookAuthor = {
  auth : {
    mode: 'required',
    strategy: 'session',
    scope: ['librarian','student']
  },
  handler : function(request, reply){
    book.find({'autor' : request.params.autor}, function(err, Books){
      if(!err && Books){
        return reply({libros: Books, success: true});
      }else if(!err){
        return reply({message: 'No se encontro ningun libro para ese autor',success: false});
      }else if(err){
        return reply({message: err, success: false});
      }
    });
  }
}

// get libros Prestados
exports.getBookPrestado = {
  auth : {
    mode: 'required',
    strategy: 'session',
    scope: ['librarian','student']
  },
  handler : function(request, reply){
    book.find({'prestado' : 1}, function(err, Books){
      if(!err && Books){
        return reply(Books);
      }else if(!err){
        return reply(boom.notFound());
      }else if(err){
        return reply(boom.wrap(err, 'Books not found'));
      }
    });
  }
}

//prestar
exports.putBookPrestado = {
  auth : {
    mode: 'required',
    strategy: 'session',
    scope: ['student']
  },
  handler: function(request, reply){
      book.findOne({_id : request.params.id}, function(err, Book){
        if(!err && Book){
          var copias = Book.copias_disponible -1;
          book.update(
            {'_id': request.params.id},
            {$set:
              {
                copias_disponible: copias,
                prestado: 1
              }
            }, function(err){
              if(err){
                return reply({message: boom.wrap(err, 'Book not found'), success: false});
              }else{
                return reply({message: 'Prestado con exito', success: true});
              }
            }
          );
        }else if(!err){
          return reply({message: boom.notFound(), success: false});
        }else if(err){
          return reply({message: boom.wrap(err, 'Book not found'),success: true});
        }
      });
  }
}

//modificar libros
exports.modifyBook = {
  auth : {
    mode: 'required',
    strategy: 'session',
    scope: ['librarian']
  },
  handler: function(request, reply){
    book.update(
      {'_id': request.params.id},
      {$set:
        {
          titulo : request.payload.titulo,
          genero : request.payload.genero,
          autor : request.payload.autor,
          publicacion : request.payload.publicacion,
          editorial : request.payload.editorial,
          descripcion : request.payload.descripcion,
          keywords : request.payload.keywords
        }
      }, function(err){
        if(err){
          return reply({message:boom.wrap(err, 'Book not found'), success: false});
        }else{
          return reply({success: true, message: 'updated succesfully'});
        }
      }
    );
  }
}

//Create a new book
exports.createBook = {
  auth : {
    mode: 'required',
    strategy: 'session',
    scope: ['librarian']
  },
  handler: function(request, reply){
    var newBook = new book({
      titulo : request.payload.titulo,
      genero : request.payload.genero,
      autor : request.payload.autor,
      publicacion : request.payload.publicacion,
      editorial : request.payload.editorial,
      descripcion : request.payload.descripcion,
      keywords : request.payload.keywords,
      copias_total : request.payload.copias_total,
      copias_disponible : request.payload.copias_disponible,
      prestado : 0
    });
    newBook.save(function(err){
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

//Delete a book given its id
exports.deleteBook = {
  auth : {
    mode: 'required',
    strategy: 'session',
    scope: ['librarian']
  },
  handler: function(request, reply){
    book.findOne({'_id' : request.params.id}, function(err, Book){
      if(err){
        return reply(boom.badRequest("Could not delete book"));
      }else if(!err && Book){
        Book.remove();
        return reply('Book deleted succesfully');
      }else if(!err){
        return reply(boom.notFound());
      }
    });
  }
}

exports.getBookKey = {
  auth : {
    mode: 'required',
    strategy: 'session',
    scope: ['librarian','student']
  },
  handler : function(request, reply){
    var array=request.query.key;
    book.find({},function(err, books){
      var booksToReturn = [];
      var added=false;
      for (var i = 0; i < books.length; i++) {
        for(var j = 0; j < array.length; j++){
          if(books[i].keywords.includes(array[j]) && !added){
            added=true;
            booksToReturn.push(books[i]);
          }
        }
        added=false;
      }
      if(booksToReturn.length >0){
        return reply({libros: booksToReturn, success:true});
      }else{
        return reply({message: 'No books found', success: false});
      }
      return reply({success :false});
      });
  }
}

