"use strict";
exports.__esModule = true;
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var emoji = require('node-emoji');
dotenv.config();
mongoose.connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        console.error(err);
    }
    else {
        console.log(emoji.get('fire'), 'Conectado');
    }
});
exports["default"] = mongoose;
