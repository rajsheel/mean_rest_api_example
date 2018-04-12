var mongoose = require('mongoose');

var Schema = mongoose.Schema;
const statesArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];


var StoreSchema = new Schema(
  {
    name: {type: String, required: true},
    author: {type: Schema.ObjectId, ref: 'Author', required: true},
    address: {
        street: String,
        zip: {type: Schema.ObjectId, ref: 'Genre'}
    },
    summary: {type: String, required: true},
    isbn: {type: String, required: true},
    genre: [{type: Schema.ObjectId, ref: 'Genre'}]
  }
);

// Virtual for book's URL
BookSchema
.virtual('url')
.get(function () {
  return '/catalog/book/' + this._id;
});

//Export model
module.exports = mongoose.model('Book', BookSchema);


