// Load required packages
const mongoose = require('mongoose');

// Define our clinic schema
const CountersSchema = new mongoose.Schema({
    _id: String,
    sequence_value: Number
});

CountersSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};

// Export the Mongoose model
module.exports = mongoose.model('counters', CountersSchema);
