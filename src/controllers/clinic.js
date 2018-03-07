// DB Models
const Clinic = require('./../models/Clinic');

// Setup Sequances
const Counter = require('./../models/Counters');

try {
    // Create clinic Counter
    const clinicCounter = new Counter({
        _id: 'clinic_id',
        sequence_value: 0
    });

    clinicCounter.save((err) => {
        if (err) {
            console.log('creating clinic counter failed: ', err);
        } else {
            console.log('creating clinic counter success');
        }
    });
} catch (ex) {
    console.log('schema clinicCounter already exists');
}

module.exports = {
    postClinic: (req, res) => {
        // Create a new instance of the Clinic model
        console.log('***********************  postClinic ***********************');
        let clinic = new Clinic();

        // Set the clinic properties that came from the POST data
        const reqBody = req.body;
        getNextSequenceValue('clinic_id').then((n) => {
            clinic.name = reqBody.name;
            clinic.address = reqBody.address;
            clinic.address2 = reqBody.address2;
            clinic.city = reqBody.city;
            clinic.country = reqBody.country;
            clinic.clinicId = n,
            clinic.phoneNumber = reqBody.phoneNumber;

            console.log('clinic: ', clinic);

            // Save the clinic and check for errors
            clinic.save((err) => {
                if (err) {
                    res.send(err);
                }
                res.json({
                    message: 'clinic added to the Hospitify!',
                    data: clinic
                });
            });
        }).catch((err) => {
            throw err
        });
    },

    getClinics: (req, res) => {
        console.log('***********************  getClinics ***********************');
        Clinic.find((err, clinics) => {
            if (err) {
                res.send(err);
            }
            res.json(clinics);
        });
    },

    getClinic: (req, res) => {
        console.log('***********************  getClinic ***********************');
        Clinic.findOne({'clinicId': req.params.clinic_id}, (err, clinic) => {
            if (err) {
                res.send(err);
            }
            res.json(clinic);
        });
    },

    updateClinic: (req, res) =>  {
        console.log('***********************  updateClinic ***********************');
        Clinic.findOne({'clinicId': req.params.clinic_id}, (err, clinic) => {
          if (err)
            res.send(err);

          // Update the existing clinic name
          clinic.name = req.body.name;

          // Save the clinic and check for errors
          clinic.save(function(err) {
            if (err)
              res.send(err);

            res.json(clinic);
          });
        });
    },

    deleteClinic: (req, res) => {
        console.log('***********************  deleteClinic ***********************');
        Clinic.findOneAndRemove({'clinicId': req.params.clinic_id}, (err) => {
          if (err)
            res.send(err);

          res.json({ message: 'Clinic removed from Hospitify!' });
        });
    }
};


function getNextSequenceValue(sequenceName) {
    return new Promise((resolve, reject) => {
        Counter.findAndModify({
            _id: sequenceName
        }, [], {
            $inc: {
                sequence_value: 1
            }
        }, {}, function(err, counter) {
            if (err) {
                reject(err);
            }
            console.log('updated, counter is ', counter.value.sequence_value);
            resolve(counter.value.sequence_value);
        });
    });

}
