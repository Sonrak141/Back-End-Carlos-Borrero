const http = require('http');
const moment = require('moment');

const server = http.createServer((req, res)=> {
    const horaActual = moment().hours();

    if(horaActual >= 6 && horaActual < 12){
        res.end('Buenos Dias')
    }else if(horaActual >= 12 && horaActual < 17){
        res.end('Buenas tardes')
    }else {
        res.end('Buenas Noches')
    }
}) 

const PORT = 3001;
const connectedServer = server.listen(PORT, () => {
	console.log(`Servidor escuchando en HTTP puerto ${PORT}`
)})
