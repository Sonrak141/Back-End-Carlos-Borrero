const express = require( 'express')
const emoji = require( 'node-emoji')
const cors = require( 'cors')
const morgan = require( 'morgan')
const dotenv = require( 'dotenv')
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use(morgan('dev'))

const PORT = parseInt(process.argv[2]) || 3000

app.get('/datos', (req, res) => {
  res.status(200).send(`Servidor express en <b>${PORT}</b> - PID ${process.pid} `)
})

const server = app.listen(PORT, () => console.log(emoji.get('fire'),`Server started on port http://localhost:${PORT}`))
server.on('error', (err) => console.log(err))