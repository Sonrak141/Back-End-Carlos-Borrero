const moment = require('moment');

const hoy = moment();
console.log(hoy);

const bDate = moment('24/04/1994', 'DD/MM/YYYY')

const diferencia = hoy.diff(bDate, 'years')
console.log(diferencia)