"use strict";
exports.__esModule = true;
exports.db = void 0;
var config_js_1 = require("./config.js");
var knex_1 = require("knex");
exports.db = (0, knex_1["default"])(config_js_1.config);
console.log(config_js_1.config);
