const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.send('<h1 style = "color:blue">Servidor Express</h1>')
})
let visitas = 0
app.get('/visitas', (req, res, next) => {
    visitas ++
    res.send(`Cantidad de Visitas: ${visitas}`)
})
app.get('/fyh', (req, res, next) => {
    let date = new Date().toLocaleString("es-CO")
    res.send(`La hora es ${date}`)
})
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log('Servidor corriendo con express')
})