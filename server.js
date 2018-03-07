// Get the packages we need
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const clinicController = require('./src/controllers/clinic');
const clinicAccountsController = require('./src/controllers/clinicAccounts');

const passport = require('passport');
const authController = require('./src/controllers/auth');

// Connect to the MongoDB
const HospitifyDB = 'mongodb://localhost:27017/Hospitify';
mongoose.connect(HospitifyDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// Create our Express application
const app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());


// Use environment defined port or 3000
const port = process.env.PORT || 3000;

// Create our Express router
const router = express.Router();

// Create a new route with the prefix /clinics
router.route('/clinics')
    .post(authController.isAuthenticated, clinicController.postClinic)
    .get(authController.isAuthenticated, clinicController.getClinics);


// Create a new route with the /beers/:beer_id prefix
router.route('/clinic/:clinic_id')
    .put(authController.isAuthenticated, clinicController.updateClinic)
    .get(authController.isAuthenticated, clinicController.getClinic)
    .delete(authController.isAuthenticated, clinicController.deleteClinic);


router.route('/clinicAccounts')
    .post(clinicAccountsController.postClinicAccounts)
    .get(authController.isAuthenticated, clinicAccountsController.getClinicAccounts);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('server started on port: ' + port);
module.exports = app;
