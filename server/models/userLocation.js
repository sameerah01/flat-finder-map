const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  rentalType: {
    type: String
  },
  propImage: {
    type: Array
  },
  lat: {
    type: String
  },
  lng: {
    type: String
  }
}, { timestamps: true })

const LocationModel = mongoose.model('Location', locationSchema);
module.exports = LocationModel;