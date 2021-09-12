"use strict";
exports.__esModule = true;
exports.config = void 0;
var dotenv = require("dotenv");
dotenv.config();
exports.config = {
    client: 'mysql',
    connection: {
        host: process.env.HOST,
        user: process.env.USERDB,
        password: process.env.PASSWORDDB,
        database: process.env.DATABASE
    }
};
