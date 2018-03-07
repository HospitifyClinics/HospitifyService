// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var clinicsAcccount = require('../models/clinicsAccount');

passport.use(new BasicStrategy(
    function(username, password, callback) {
        clinicsAcccount.findOne({
            username: username
        }, function(err, clinic) {
            if (err) {
                return callback(err);
            }

            // No ClinicAccountfound with that username
            if (!clinic) {
                return callback(null, false);
            }

            // Make sure the password is correct
            clinic.verifyPassword(password, function(err, isMatch) {
                if (err) {
                    return callback(err);
                }

                // Password did not match
                if (!isMatch) {
                    return callback(null, false);
                }

                // Success
                return callback(null, clinic);
            });
        });
    }
));

exports.isAuthenticated = passport.authenticate('basic', {
    session: false
});
