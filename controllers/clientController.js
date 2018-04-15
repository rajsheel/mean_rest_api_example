var Client = require('../models/client');
var Zip = require('../models/zipcodes');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


var async = require('async');

// Handle client create on POST.
exports.client_create_post = [

    // Validate fields.

    body('name', 'Name must not be empty.').isLength({ min: 1 }).trim(),
    body('url', 'URL must not be empty.').isLength({ min: 1 }).trim(),
    body('startDate', 'Invalid start date').isISO8601(),
    body('ownerName', 'Owner Name must not be empty.').isLength({ min: 1 }).trim(),
    body('street', 'Street must not be empty.').isLength({ min: 1 }).trim(),
    body('zip', 'Zip must not be empty.').isLength({ min: 1 }).trim(),
    
   
    // Sanitize fields.
    sanitizeBody('*').trim().escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        

        // Extract the validation errors from a request.
        const errors = validationResult(req);
         console.log(req.body.zip);
         Zip.findOne({ "_id" : req.body.zip }, '_id city', function (err, zip) {
            if (err) return handleError(err);
            // Prints "Space Ghost is a talk show host".
            console.log(zip._id, zip.city);
        });
        // Create a Client object with escaped and trimmed data.
        var client = new Client(
          { name: req.body.name,
            url: req.body.url,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            ownerName: req.body.ownerName,
            address: {
                street: req.body.street,
                zip: new Zip({"-id" : req.body.zip})
            }
           });

        if (!errors.isEmpty()) {
            // There are errors. Send the errors back.
              res.status(400).json({ errors: errors.array()}); 
              return;
        }
        else {
            // Data from request is valid. Save Client.
            client.save(function (err) {
                if (err) { handleError(res, err.message, "Failed to add client"); }
                else {
                   // Successful - redirect to new book record.
                   res.status(200).json({ message: "Client"+req.body.name+"added Successfully"});                    
                }
                });
        }
    }
];


function handleError(res, reason, message, code) {

console.log("ERROR: " + reason);

res.status(code || 500).json({"error": message});

};

