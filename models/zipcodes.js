var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var ZipCodeSchema = new Schema(
  {
    _id : String,
    city: {type: String, required: true},
   
    loc: [{type: Number}],
    pop : Number,
    state : {type: String, required: true}
  }
);



//Export model
module.exports = mongoose.model('ZipCode', ZipCodeSchema);


