const mongoose = require("mongoose");
const { Diabetes } = require('../models/diabetes')
const { Report } = require('../models/report')


async function get_data(req, res){

    const data = await Diabetes.find({});

    if (data.length === 0) return res.status(404).send('No data found !')

    console.log(data)

    res.status(200).send(data)
}

async function get_average() {

    const data = await Diabetes.find({});

    if (data.length === 0) return res.status(404).send('No data found !')

    // console.log(data)

    let pregTotal = 0
    let glucTotal = 0
    let bpTotal = 0
    let skinTotal = 0
    let insulineTotal = 0
    let bmiTotal = 0
    let pedigreeTotal = 0
    let ageTotal = 0
    let averageOutcome = 0

    for (let row of data) {
        pregTotal += parseInt(row.Pregnancies)
        glucTotal += parseInt(row.Glucose)
        bpTotal += parseInt(row.BloodPressure)
        skinTotal += parseInt(row.SkinThickness)
        insulineTotal += parseInt(row.Insulin)
        bmiTotal += parseInt(row.BMI)
        pedigreeTotal += parseInt(row.DiabetesPedigreeFunction)
        ageTotal += parseInt(row.Age)
        averageOutcome += parseInt(row.Outcome)
    }

    return {
        pregnancies: pregTotal / data.length,
        glucose: glucTotal / data.length,
        bloodPressure: bpTotal / data.length,
        skinThickness: skinTotal / data.length,
        insulin: insulineTotal / data.length,
        BMI: bmiTotal / data.length,
        age: ageTotal / data.length,
        diabetic_pedegree: pedigreeTotal / data.length,
        averageOutcome: averageOutcome / data.length,
    }

}


async function return_average(req, res) {
    const average = await get_average();
    res.status(200).send(average);
}

async function check_data(req, res) {
    // You can take any number of inoputs from here
    const { email, pregnancies, glucose, bloodPressure, skinThickness, insulin, BMI, age } = req.body

    // checking is data was supplied and not left empty. Logic -> if not name or not loca or not age ... return error
    if(!email || !pregnancies || !glucose || !bloodPressure || !skinThickness || !insulin || !BMI || !age) return res.status(401).send('Include valid request body ;)')

    try {
        const average = await get_average();

        let outcome = false

        console.log(average);

        let count = 0;

        if (pregnancies >= average.pregnancies) count ++
        if (glucose >= average.glucose) count ++
        if (bloodPressure >= average.bloodPressure) count ++
        if (skinThickness >= average.skinThickness) count ++
        if (insulin >= average.insulin) count ++
        if (BMI >= average.BMI) count ++
        if (age >= average.age) count ++

        if (count >= 4) outcome = true

        const obj = await new Report({
            email,
            userData: {
                pregnancies,
                glucose,
                bloodPressure,
                skinThickness,
                insulin,
                BMI,
                age
            },
            isDiabetic: outcome
        }).save();

        res.status(200).send(obj)
    } catch (e) {
        res.status(501).send(e)
    }
}

module.exports = {
    get_data,
    return_average,
    check_data
};
