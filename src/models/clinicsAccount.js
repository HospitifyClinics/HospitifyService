// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Define our ClinicAccount schema
var ClinicAccountSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Execute before each ClinicAccount.save() call
ClinicAccountSchema.pre('save', function(callback) {
  var ClinicAccount = this;

  // Break out if the password hasn't changed
  if (!ClinicAccount.isModified('password')) return callback();

  // Password changed so we need to hash it
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return callback(err);

    bcrypt.hash(ClinicAccount.password, salt, null, function(err, hash) {
      if (err) return callback(err);
      ClinicAccount.password = hash;
      callback();
    });
  });
});


ClinicAccountSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// Export the Mongoose model
module.exports = mongoose.model('ClinicAccount', ClinicAccountSchema);
