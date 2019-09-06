const mongoose = require("mongoose");

const { Schema } = mongoose;

const locationSchema = new Schema({
  country: String,
  countryCode: String,
  formattedAddress: String,
  locality: String,
  streetName: String,
  position: { type: { lat: Number, lng: Number } }
});

module.exports = locationSchema;
