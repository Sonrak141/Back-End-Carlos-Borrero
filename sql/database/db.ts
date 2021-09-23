const { config }= require('./config.js')
const knex =require('knex')

export const db = knex(config)
console.log(config)

