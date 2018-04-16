var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var ClientSchema = new Schema(
  {
    
    name: {type: String, required: true},
    url: {type: String, required: true},
    startDate : {type: Date, required: true},
    endDate : Date,
    ownerName: {type: String, required: true},
    address: {
        street: String,
        zip: {type: String, ref: 'ZipCode'}
    }
  }
);



//Export model
module.exports = mongoose.model('Client', ClientSchema);


