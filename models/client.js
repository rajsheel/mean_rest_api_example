var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var ClientSchema = new Schema(
  {
    name: {type: String, required: true},
    url: {type: String, required: true},
    startDate : {type: Date, required: true},
    endDate : Date,
    ownerName: {type: String, required: true},
   // ownerEmail : {type: String, required: true},
   // ownerPhone : {type: String, required: true},
    
    address: {
        street: String,
        zip: {type: Schema.ObjectId, ref: 'ZipCode'}
         // zip: {type: String}
    }
  }
);



//Export model
module.exports = mongoose.model('Client', ClientSchema);


