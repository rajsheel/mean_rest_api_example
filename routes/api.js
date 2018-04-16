var express = require('express');
var router = express.Router();

// Require controller modules.
var zipcodesController = require('../controllers/zipcodesController');
var clientController = require('../controllers/clientController');
// var genre_controller = require('../controllers/genreController');
// var book_instance_controller = require('../controllers/bookinstanceController');

/// ZIP CODE ROUTES ///

// // GET catalog home page.
// router.get('/', book_controller.index);

// // GET request for creating a Book. NOTE This must come before routes that display Book (uses id).
// router.get('/book/create', book_controller.book_create_get);

// // POST request for creating Book.
// router.post('/book/create', book_controller.book_create_post);

// // GET request to delete Book.
// router.get('/book/:id/delete', book_controller.book_delete_get);

// // POST request to delete Book.
// router.post('/book/:id/delete', book_controller.book_delete_post);

// // GET request to update Book.
// router.get('/book/:id/update', book_controller.book_update_get);

// // POST request to update Book.
// router.post('/book/:id/update', book_controller.book_update_post);

// GET request for one zip code.
router.get('/', function(req, res, next) {
  res.send("You have reached API testing page, try some calls");
});

// GET request for one zip code.
router.get('/zip/:id', zipcodesController.zipcode_details);

// GET request for list of city based on partual city name.
router.get('/city/:name', zipcodesController.city_list);

// POST request to create a new client.
router.post('/client/create', clientController.client_create_post);

// GET request to get client, use with query parameters of id or name but not both.
router.get('/client/search', clientController.client_search_get);

// POST request to updaet an existing client.
router.post('/client/update', clientController.client_update_post);

// POST request to delete an existing client.
router.post('/client/delete', clientController.client_delete_post);


// GET request for city details based on exact city name.
// // GET request for list of all Book items.
// router.get('/books', book_controller.book_list);

// /// AUTHOR ROUTES ///

// // GET request for creating Author. NOTE This must come before route for id (i.e. display author).
// router.get('/author/create', author_controller.author_create_get);

// // POST request for creating Author.
// router.post('/author/create', author_controller.author_create_post);

// // GET request to delete Author.
// router.get('/author/:id/delete', author_controller.author_delete_get);

// // POST request to delete Author.
// router.post('/author/:id/delete', author_controller.author_delete_post);

// // GET request to update Author.
// router.get('/author/:id/update', author_controller.author_update_get);

// // POST request to update Author.
// router.post('/author/:id/update', author_controller.author_update_post);

// // GET request for one Author.
// router.get('/author/:id', author_controller.author_detail);

// // GET request for list of all Authors.
// router.get('/authors', author_controller.author_list);

// /// GENRE ROUTES ///

// // GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
// router.get('/genre/create', genre_controller.genre_create_get);

// //POST request for creating Genre.
// router.post('/genre/create', genre_controller.genre_create_post);

// // GET request to delete Genre.
// router.get('/genre/:id/delete', genre_controller.genre_delete_get);

// // POST request to delete Genre.
// router.post('/genre/:id/delete', genre_controller.genre_delete_post);

// // GET request to update Genre.
// router.get('/genre/:id/update', genre_controller.genre_update_get);

// // POST request to update Genre.
// router.post('/genre/:id/update', genre_controller.genre_update_post);

// // GET request for one Genre.
// router.get('/genre/:id', genre_controller.genre_detail);

// // GET request for list of all Genre.
// router.get('/genres', genre_controller.genre_list);

// /// BOOKINSTANCE ROUTES ///

// // GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
// router.get('/bookinstance/create', book_instance_controller.bookinstance_create_get);

// // POST request for creating BookInstance. 
// router.post('/bookinstance/create', book_instance_controller.bookinstance_create_post);

// // GET request to delete BookInstance.
// router.get('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_get);

// // POST request to delete BookInstance.
// router.post('/bookinstance/:id/delete', book_instance_controller.bookinstance_delete_post);

// // GET request to update BookInstance.
// router.get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);

// // POST request to update BookInstance.
// router.post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_post);

// // GET request for one BookInstance.
// router.get('/bookinstance/:id', book_instance_controller.bookinstance_detail);

// // GET request for list of all BookInstance.
// router.get('/bookinstances', book_instance_controller.bookinstance_list);

module.exports = router;