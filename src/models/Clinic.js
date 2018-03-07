// Load required packages
const mongoose = require('mongoose');

// Define our clinic schema
const ClinicSchema = new mongoose.Schema({
    name: String,
    address: String,
    address2: String,
    clinicId: Number,
    city: String,
    country: Number,
    phoneNumber: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Clinic', ClinicSchema);
