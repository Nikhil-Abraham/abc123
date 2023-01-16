const mongoose = require("mongoose");

const DiabetesSchema = new mongoose.Schema({
    Pregnancies: {type: String},
    Glucose: {type: String},
    BloodPressure: {type: String},
    SkinThickness: {type: String},
    Insulin: {type: String},
    BMI: {type: String},
    DiabetesPedigreeFunction: {type: String},
    Age: {type: String},
    Outcome: {type: String},
})

const Diabetes = mongoose.model('diabetes', DiabetesSchema, 'diabetes');


module.exports = {
    Diabetes
};