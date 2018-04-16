var Client = require('../models/client');
var Zip = require('../models/zipcodes');

const {
    body,
    validationResult
} = require('express-validator/check');
const {
    sanitizeBody
} = require('express-validator/filter');


var async = require('async');

// Find matching client either by name or _id

exports.client_search_get = function(req, res, next) {


    if (Object.keys(req.query).length > 1) {
        var message = "Please query either by id or name";
        return handleError(res, message, message);
    }

    if (req.query.name != null) {
        Client.find({
                "name": new RegExp("^" + req.query.name, "i")
            }).populate('address.zip')
            .exec(function(err, results) {
                if (err) {
                    return handleError(res, err.message, "Failed to get client details");
                }
                if (results.length == 0) { // No results.
                    var message = 'Client ' + req.params.name + ' not found';
                    return handleError(res, "No Error - Client Not Found", message, 400);

                } else {
                    // Successful, so send.
                    res.status(200).json(results);
                    //console.log(results.client);
                }

            });
    } else if (req.query.id != null) {
        Client.findById(req.query.id).populate('address.zip')
            .exec(function(err, results) {
                if (err) {
                    return handleError(res, err.message, "Failed to get client details");
                }
                if (results.length == 0) { // No results.
                    var message = 'Client ' + req.params.id + ' not found';
                    console.log(req.params.id);
                    return handleError(res, "No Error - Client Not Found", message, 400);

                } else {
                    // Successful, so send.
                    res.status(200).json(results);
                }

            });
    } else {
        var message = "Please query either by id or name";
        res.status(200).json(message);
    }
};


// Handle client create on POST.
exports.client_create_post = [

    // Validate fields.

    body('name', 'Name must not be empty.').isLength({
        min: 1
    }).trim(),
    body('url', 'URL must not be empty.').isLength({
        min: 1
    }).trim(),
    body('startDate', 'Invalid start date').isISO8601(),
    body('ownerName', 'Owner Name must not be empty.').isLength({
        min: 1
    }).trim(),
    body('street', 'Street must not be empty.').isLength({
        min: 1
    }).trim(),
    body('zip', 'Zip must not be empty.').isLength({
        min: 1
    }).trim(),


    // Sanitize fields.
    sanitizeBody('*').trim().escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {


        // Extract the validation errors from a request.
        const errors = validationResult(req);
        //console.log(req.body);

        var client = new Client({
            name: req.body.name,
            url: req.body.url,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            ownerName: req.body.ownerName,
            address: {
                street: req.body.street,
                zip: req.body.zip
            }
        });

        if (!errors.isEmpty()) {
            // There are errors. Send the errors back.
            res.status(400).json({
                errors: errors.array()
            });
            return;
        } else {
            // Data from request is valid. Save Client.
            client.save(function(err) {
                if (err) {
                    return handleError(res, err.message, "Failed to add client");
                } else {
                    // Successful - redirect to new book record.
                    res.status(200).json({
                        message: "Client " + req.body.name + " added Successfully"
                    });
                }
            });
        }
    }
];

// Handle client update on POST.
exports.client_update_post = [

        // Validate fields.

        body('name', 'Name must not be empty.').isLength({
            min: 1
        }).trim(),
        body('url', 'URL must not be empty.').isLength({
            min: 1
        }).trim(),
        body('startDate', 'Invalid start date').isISO8601(),
        body('ownerName', 'Owner Name must not be empty.').isLength({
            min: 1
        }).trim(),
        body('street', 'Street must not be empty.').isLength({
            min: 1
        }).trim(),
        body('zip', 'Zip must not be empty.').isLength({
            min: 1
        }).trim(),
        body('_id', 'id must not be empty.').isLength({
            min: 1
        }).trim(),


        // Sanitize fields.
        sanitizeBody('*').trim().escape(),
        // Process request after validation and sanitization.
        (req, res, next) => {


            // Extract the validation errors from a request.
            const errors = validationResult(req);
            //console.log(req.body);

            var client = new Client({
                name: req.body.name,
                url: req.body.url,
                startDate: req.body.startDate,
                endDate: req.body.endDate,
                ownerName: req.body.ownerName,
                address: {
                    street: req.body.street,
                    zip: req.body.zip
                },
                _id: req.body._id
            });

            if (!errors.isEmpty()) {
                // There are errors. Send the errors back.
                res.status(400).json({
                    errors: errors.array()
                });
                return;
            } else {
                // Data from request is valid. Save Client.
                console.log(req.body._id);


                Client.findByIdAndUpdate(req.body._id, client, {}, function(err, client) {
                        if (err) {
                            return handleError(res, err.message, "Failed to update client");
                        } else if (!client) {
                            // Not Successful, client not found .
                            res.status(404).json({
                                    message: "Client " + req.body._id + " Not Found"})

                                }
                                else {
                                    // Successful .
                                    res.status(200).json({
                                        message: "Client " + req.body.name + " updated Successfully"
                                    });
                                }
                            });
                    }
                }
            ];

            exports.client_delete_post = function(req, res, next) {

                if (req.query.id != null) {
                    Client.findByIdAndRemove(req.query.id, function(err, client) {
                        if (err) {
                            return handleError(res, err.message, "Failed to delete client");
                        } else if (!client) {
                            // Not Successful, client not found .
                            res.status(404).json({
                                message: "Client " + req.query.id + " Not Found"
                            })
                        } else {
                            // Successful, so send.
                            res.status(200).json({
                                message: "Client " + req.query.id + " deleted Successfully"
                            });
                        }
                    });
                } else {
                    var message = "Please provide id of the client to be deleted";
                    res.status(200).json(message);
                }
            };

            function handleError(res, reason, message, code) {

                console.log("ERROR: " + reason);

                res.status(code || 500).json({
                    "error": reason
                });

            };