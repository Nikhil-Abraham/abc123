const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    userData: {
        pregnancies: {type: String},
        glucose: {type: String},
        bloodPressure: {type: String},
        skinThickness: {type: String},
        insulin: {type: String},
        BMI: {type: String},
        age: {type: String},
    },
    isDiabetic: {type: Boolean, required: true}


})

const Report = mongoose.model('reports', ReportSchema, 'reports');


module.exports = {
    Report
};
