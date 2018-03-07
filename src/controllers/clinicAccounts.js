// Load required packages
const ClinicAccount = require('../models/clinicsAccount');

// Create endpoint /api/ClinicAccounts for POST
exports.postClinicAccounts = function(req, res) {
    console.log('***********************  postClinicAccounts ***********************');
    const account = new ClinicAccount({
        username: req.body.username,
        password: req.body.password
    });

    account.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            message: 'New clinic added to the clinic Accounts!'
        });
    });
};

// Create endpoint /api/ClinicAccounts for GET
exports.getClinicAccounts = function(req, res) {
    console.log('***********************  getClinicAccounts ***********************');
    ClinicAccount.find(function(err, ClinicAccounts) {
        if (err)
            res.send(err);

        res.json(ClinicAccounts);
    });
};
