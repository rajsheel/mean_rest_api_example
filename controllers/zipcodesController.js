var Zip = require('../models/zipcodes');
// var Author = require('../models/author');
// var Genre = require('../models/genre');
// var BookInstance = require('../models/bookinstance');

var async = require('async');


// Find zip code details based on zip code.
exports.zipcode_details = function(req, res, next) {

    async.parallel({
        zipcodes: function(callback) {

            Zip.findOne({"_id" : req.params.id})
              .exec(callback);
        }
    }, function(err, results) {
        if (err) { handleError(res, err.message, "Failed to get zip details"); }
        if (results.zipcodes==null) { // No results.
             var message = 'Zip '+req.params.id+' not found';
            handleError(res, "No Error - Zip Not Found", message,400);

        } else {
        // Successful, so send.
        res.status(200).json(results.zipcodes);    
        }
        
    });

};

// Find matching city starting with city name.

exports.city_list = function(req, res, next) {

    async.parallel({
        city: function(callback) {

            Zip.find({"city" : new RegExp ("^"+req.params.name,"i")}).distinct('city')
              .exec(callback);
        }
    }, function(err, results) {
        if (err) { handleError(res, err.message, "Failed to get city details"); }
        if (results.city.length==0) { // No results.
             var message = 'City '+req.params.name+' not found';
            handleError(res, "No Error - City Not Found", message,400);

        } else {
        // Successful, so send.
        res.status(200).json(results.city);    
        }
        
    });

};


function handleError(res, reason, message, code) {

console.log("ERROR: " + reason);

res.status(code || 500).json({"error": message});

};

