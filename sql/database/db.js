"use strict";
exports.__esModule = true;
exports.db = void 0;
var config = require('./config.js').config;
var knex = require('knex');
exports.db = knex(config);
console.log(config);
