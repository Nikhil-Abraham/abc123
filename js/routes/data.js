const express = require('express');
const bodyParser = require('body-parser');
const { get_data, get_average, check_data } = require('../controllers/data')

const router = express.Router()

router.use(bodyParser.json());

// These are two routes that give all the data and the average of all of it
// What else do u need ?
// ok to test that i need to send data to the backend -> eit

router.get('/', get_data)

router.get('/average', get_average)

router.post('/check-data', check_data)

// What do you want to do with the user input data ?
// this endpoint will collect any data u want to send to the backend

module.exports = router;
