const express = require('express'),
    mongoose = require('mongoose'),
    port = 8080;
const app = express();

const dataRouter = require('./routes/data')
const {check_data} = require("./controllers/data");

mongoose.connect("mongodb+srv://admin:admin@cluster0.h7art.mongodb.net/project")

app.use('/data', dataRouter);

app.listen(port, () => {console.log("running");})

